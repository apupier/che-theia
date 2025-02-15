/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import * as che from '@eclipse-che/plugin';
import { WorkspacePort } from './workspace-port';

/**
 * Grab ports exposed in the workspace.
 * @author Florent Benoit
 */
export class WorkspaceHandler {
    async getWorkspacePorts(): Promise<Array<WorkspacePort>> {
        const workspace = await che.workspace.getCurrentWorkspace();

        const ports: WorkspacePort[] = [];
        if (!workspace) {
            return ports;
        }
        const runtimeMachines = workspace!.runtime!.machines || {};
        Object.keys(runtimeMachines).forEach((machineName: string) => {
            const machineServers = runtimeMachines[machineName].servers || {};
            Object.keys(machineServers).forEach((serverName: string) => {
                const url = machineServers[serverName].url!;
                const portNumber = machineServers[serverName].attributes!.port!;
                ports.push({ portNumber, serverName, url });
            });

        });
        return ports;
    }
}
