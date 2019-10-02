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
// import { che } from '@eclipse-che/api';
import * as che from '@eclipse-che/plugin';

export async function start(context: theia.PluginContext) {
    const GENERATE_FOR_HOST: theia.CommandDescription = {
        id: 'hello_world',
        label: 'Hello World'
    };

    // const uri = theia.Uri.parse('http://che-che.192.168.39.119.nip.io/api/oauth/authenticate?oauth_provider=github&' +
    //     'userId=che&scope=user:email&redirect_after_login=http://che-che.192.168.39.119.nip.io/dashboard/#/create-workspace');
    // theia.commands.executeCommand('vscode.open', uri);
    // const plugin = theia.plugins.getPlugin('GitHub.vscode-pull-request-github');
    // const ctx = plugin.context;
    // if (context) {
    //     ctx.globalState.update('keychain: github.com', '');
    // }

    theia.commands.registerCommand(GENERATE_FOR_HOST, async () => {
        che.window.open('http://github.com');
    });
}

export function stop() {

}
