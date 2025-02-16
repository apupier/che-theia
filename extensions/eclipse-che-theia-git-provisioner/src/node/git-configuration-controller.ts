/********************************************************************************
 * Copyright (C) 2018-2019 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

/// <reference types='@theia/core/src/typings/nsfw/index'/>

import { injectable, inject } from 'inversify';

import { homedir } from 'os';
import { resolve } from 'path';
import { CheTheiaUserPreferencesSynchronizer } from '@eclipse-che/theia-user-preferences-synchronizer/lib/node/che-theia-preferences-synchronizer';
import { writeFile, pathExists, createFile, readFile } from 'fs-extra';
import * as ini from 'ini';
import * as nsfw from 'nsfw';
import { Disposable } from '@theia/core';

export const GIT_CONFIG_PATH = resolve(homedir(), '.gitconfig');
export const GIT_USER_NAME = 'git.user.name';
export const GIT_USER_EMAIL = 'git.user.email';

export interface UserConfiguration {
    name: string | undefined;
    email: string | undefined;
}

@injectable()
export class GitConfigurationController {

    @inject(CheTheiaUserPreferencesSynchronizer)
    protected preferencesService: CheTheiaUserPreferencesSynchronizer;

    protected preferencesHandler: Disposable | undefined;

    protected gitConfigWatcher: nsfw.NSFW | undefined;

    public async watchGitConfigChanges(): Promise<void> {
        if (this.gitConfigWatcher) {
            return;
        }

        const gitConfigExists = await pathExists(GIT_CONFIG_PATH);
        if (!gitConfigExists) {
            await createFile(GIT_CONFIG_PATH);
        }

        this.gitConfigWatcher = await nsfw(GIT_CONFIG_PATH, async (events: nsfw.ChangeEvent[]) => {
            for (const event of events) {
                if (event.action === nsfw.actions.MODIFIED) {
                    const userConfig = await this.getUserConfigurationFromGitConfig();
                    const preferences = await this.preferencesService.getPreferences();

                    (preferences as { [index: string]: string })[GIT_USER_NAME] = userConfig.name!;
                    (preferences as { [index: string]: string })[GIT_USER_EMAIL] = userConfig.email!;

                    await this.preferencesService.setPreferences(preferences);
                }
            }
        });
        await this.gitConfigWatcher.start();
    }

    protected async getUserConfigurationFromGitConfig(): Promise<UserConfiguration> {
        const gitConfigExists = await pathExists(GIT_CONFIG_PATH);
        if (!gitConfigExists) {
            return {} as UserConfiguration;
        }

        const gitConfigContent = await readFile(GIT_CONFIG_PATH, 'utf-8');
        const gitConfig = ini.parse(gitConfigContent);

        if (gitConfig.user === undefined) {
            return {} as UserConfiguration;
        }

        const { name, email } = gitConfig.user;

        return { name, email };
    }

    public async watchUserPreferencesChanges(): Promise<void> {
        if (this.preferencesHandler) {
            return;
        }

        this.preferencesHandler = this.preferencesService.onUserPreferencesModify(preferences => {
            const config = this.getUserConfiguration(preferences);
            this.updateGlobalGitConfig(config);
        });
    }

    // tslint:disable-next-line: no-any
    protected getUserConfiguration(preferences: any): UserConfiguration {
        return {
            name: preferences[GIT_USER_NAME],
            email: preferences[GIT_USER_EMAIL]
        };
    }

    protected async updateGlobalGitConfig(config: UserConfiguration): Promise<void> {
        if (config.name === undefined && config.email === undefined) {
            return;
        }

        const gitConfig = { user: {} as UserConfiguration };

        if (config.name) {
            gitConfig.user.name = config.name;
        }

        if (config.email) {
            gitConfig.user.email = config.email;
        }

        await this.gitConfigWatcher!.stop();
        await writeFile(GIT_CONFIG_PATH, ini.stringify(gitConfig));
        await this.gitConfigWatcher!.start();
    }
}
