/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';
import { PLUGIN_RPC_CONTEXT, CheWindow, CheWindowMain } from '../common/che-protocol';

export class CheWindowImpl implements CheWindow {

    private readonly windowMain: CheWindowMain;

    constructor(rpc: RPCProtocol) {
        this.windowMain = rpc.getProxy(PLUGIN_RPC_CONTEXT.CHE_WINDOW_MAIN);
    }

    async open(url: string): Promise<void> {
        this.windowMain.$open(url);
    }
}
