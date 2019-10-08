/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import * as theia from '@theia/plugin';

export function start(context: theia.PluginContext): void {
    let initialized: boolean;
    theia.plugins.onDidChange(() => {
        const gitExtension = theia.plugins.getPlugin('vscode.git')!.exports;
        if (!initialized && gitExtension) {
            initialized = true;
            // tslint:disable-next-line:no-any
            const api: any = gitExtension.getAPI(1);
            api._model.git.onOutput.addListener('log', async (out: string) => {
                if (out.indexOf('fatal: Could not read from remote repository.') > 0) {
                    const action = await theia.window.showInformationMessage('hello', 'authenticate');
                    if (action) {
                        theia.window.showInformationMessage('step2');
                    }
                }
            });
        }
    });
}
