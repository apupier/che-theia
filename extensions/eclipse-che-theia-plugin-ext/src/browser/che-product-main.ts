/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { interfaces } from 'inversify';
import { CheProduct, CheProductMain, PLUGIN_RPC_CONTEXT } from '../common/che-protocol';
// import { BrandingService } from './branding/branding-service';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';

export class CheProductMainImpl implements CheProductMain {

    // private readonly cheApiService: CheApiService;

    // private readonly brandingService: BrandingService;

    constructor(container: interfaces.Container, rpc: RPCProtocol) {
        // this.cheApiService = container.get(CheApiService);
        const proxy: CheProduct = rpc.getProxy(PLUGIN_RPC_CONTEXT.CHE_PRODUCT);
        console.log('>>>>>>>> PROXY', proxy);

        // this.brandingService = container.get(BrandingService);

        // console.log('> brandingService > ', this.brandingService);
        console.log('> RPC protocol > ', rpc);

        proxy.$setName('VITALIY MOLODETS!');

        // setTimeout(() => {

        //     // return 'Eclipse Che';
        //     proxy.$setName('VITALIY');

        //     // return 'resources/che-logo.svg';
        //     // return 'Welcome To Your Cloud Developer Workspace';
        // }, 1000);
    }

    // async $getName(): Promise<string> {
    //     return await this.brandingService.getProductName();
    // }

    // async getLogo(): Promise<string> {
    //     return await this.brandingService.getProductLogo();
    // }

    // async getSubscription(): Promise<string> {
    //     return await this.brandingService.getProductSubscription();
    // }

}
