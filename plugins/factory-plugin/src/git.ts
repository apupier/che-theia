/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import * as path from 'path';
import * as fs from 'fs-extra';
import { execute } from './exec';

export interface GitUpstreamBranch {
    remote: string;
    branch: string;
    remoteURL?: string;
}

export async function initRepository(baseDir: string): Promise<void> {
    await execGit(baseDir, 'init');
}

export async function setConfig(projectPath: string, key: string, value: string): Promise<void> {
    await execGit(projectPath, 'config', key, value);
}

export function getRemoteURL(remote: string, projectPath: string): Promise<string | undefined> {
    return execGit(projectPath, 'config', '--get', `remote.${remote}.url`);
}

/**
 * Performs sparse checkout.
 * @param projectPath path to the directory where project should be located, must exist
 * @param repositoryUri git repository location, e.g. `https://github.com/eclipse/che.git`
 * @param sparseCheckoutDirectory directory which should be clonned, e.g. `core/che-core-api-model`
 * @param commitReference branch or tag or commit id of the remote repository to checkout from
 */
export async function sparseCheckout(projectPath: string, repositoryUri: string, sparseCheckoutDirectory: string, commitReference: string): Promise<void> {
    await initRepository(projectPath);
    // Enable sparse checkout feature
    await setConfig(projectPath, 'core.sparsecheckout', 'true');
    // Write sparse checkout directory
    const gitInfoFolderPath = path.join(projectPath, '.git/info/');
    fs.ensureDirSync(gitInfoFolderPath);
    fs.writeFileSync(path.join(gitInfoFolderPath, 'sparse-checkout'), sparseCheckoutDirectory);
    // Add remote, pull changes and create the selected directory content
    await execGit(projectPath, 'remote', 'add', '-f', 'origin', repositoryUri);
    await execGit(projectPath, 'pull', 'origin', commitReference);
}

export async function getUpstreamBranch(projectPath: string): Promise<GitUpstreamBranch | undefined> {
    const remoteBranchRef = await execGit(projectPath, 'rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{upstream}');
    if (!remoteBranchRef) {
        return;
    }
    const gitUpstreamBranch = parseGitUpstreamBranch(remoteBranchRef);
    if (gitUpstreamBranch) {
        gitUpstreamBranch.remoteURL = await getRemoteURL(gitUpstreamBranch.remote, projectPath);
    }
    return gitUpstreamBranch;
}

export function parseGitUpstreamBranch(gitBranchvvOutput: string): GitUpstreamBranch | undefined {

    const branchOrRemote = '[^\\s^/]+';
    const regexp = new RegExp(
        `(${branchOrRemote})\\/(${branchOrRemote})`
    );

    const result: RegExpMatchArray | null = gitBranchvvOutput.match(regexp);

    if (!result) {
        return undefined;
    }

    return {
        remote: result[1], branch: result[2]
    };

}

export function getGitRootFolder(uri: string): string {
    return uri.substring(0, uri.lastIndexOf('.git/'));
}

export async function execGit(directory: string, ...args: string[]): Promise<string | undefined> {
    return execute('git', args, { cwd: directory }).catch(() => undefined);
}
