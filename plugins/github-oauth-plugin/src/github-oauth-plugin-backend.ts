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
// import * as che from '@eclipse-che/plugin';

export async function start(context: theia.PluginContext) {
    const GENERATE_FOR_HOST: theia.CommandDescription = {
        id: 'hello_world',
        label: 'Hello World'
    };

    theia.commands.registerCommand(GENERATE_FOR_HOST, async () => {
        await context.globalState.update('keychain: github.com', '');
        theia.window.showInformationMessage('updated');
    });
}

export function stop() {

}
