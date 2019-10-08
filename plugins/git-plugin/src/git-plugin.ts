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

    const gitExtension = theia.plugins.getPlugin('vscode.git')!.exports;
    // tslint:disable-next-line:no-any
    const api: any = gitExtension.getAPI(1);
    api._model.git.onOutput.addListener('log', (out: string) => {
        console.log(out);
    });
}
