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
import { CheProductMain, CheProductService, ProductInfo } from '../common/che-protocol';
import { RPCProtocol } from '@theia/plugin-ext/lib/common/rpc-protocol';

export class CheProductMainImpl implements CheProductMain {

    private readonly cheProductService: CheProductService;

    constructor(container: interfaces.Container, rpc: RPCProtocol) {
        this.cheProductService = container.get(CheProductService);
    }

    async $getProductInfo(): Promise<ProductInfo> {
        return await this.cheProductService.getProductInfo();
    }

}
