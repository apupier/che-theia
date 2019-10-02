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
// import { Preferences } from '@eclipse-che/plugin';
import {
    CheProduct,
    // CheProductMain,
    // PLUGIN_RPC_CONTEXT,
} from '../common/che-protocol';

export class CheProductImpl implements CheProduct {

    // private readonly productMain: CheProductMain;

    private name: string = 'name';
    private logo: string = 'logo';
    private subscription: string = 'subscription';

    constructor(rpc: RPCProtocol) {
        // this.productMain = rpc.getProxy(PLUGIN_RPC_CONTEXT.CHE_PRODUCT_MAIN);
    }

    async $setName(name: string): Promise<void> {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>> CheProductImpl :: $setName(${name})`);
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    getLogo(): string {
        return this.logo;
    }

    getSubscription(): string {
        return this.subscription;
    }

}
