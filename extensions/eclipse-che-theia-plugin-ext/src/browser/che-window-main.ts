/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { CheWindowMain } from '../common/che-protocol';

export class CheWindowMainImpl implements CheWindowMain {
    async $open(url: string): Promise<void> {
        window.open(url, '_self');
    }
}
