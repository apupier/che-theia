/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

// import { interfaces } from 'inversify';

export class BrandingService {

    constructor() {
        console.log('>> INIT CheBrandingMainImpl');
    }

    async getProductName(): Promise<string> {
        return 'PRODUCT-NAME';
    }

    async getProductLogo(): Promise<string> {
        return 'PRODUCT-LOGO';
    }

    async getProductSubscription(): Promise<string> {
        return 'PRODUCT-SUBSCRIPTION';
    }

}
