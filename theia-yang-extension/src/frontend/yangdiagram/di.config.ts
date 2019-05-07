/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Container, injectable } from "inversify"
import { KeyTool, TYPES } from 'sprotty/lib'
import { DiagramConfiguration, EditDiagramLocker } from "sprotty-theia/lib"
import { LSTheiaDiagramServer, LSTheiaDiagramServerProvider, TheiaDiagramServer, TheiaKeyTool } from 'sprotty-theia/lib'
import { createYangDiagramContainer } from 'yang-sprotty/lib'
import { YangDiagramServer } from "./yang-diagram-server"

@injectable()
export class YangDiagramConfiguration implements DiagramConfiguration {
    diagramType: string = 'yang-diagram'

    createContainer(widgetId: string): Container {
        const container = createYangDiagramContainer(widgetId)
        container.bind(YangDiagramServer).toSelf().inSingletonScope();
        container.bind(TheiaDiagramServer).toService(YangDiagramServer);
        container.bind(LSTheiaDiagramServer).toService(YangDiagramServer);
        container.bind(TYPES.ModelSource).toService(TheiaDiagramServer);
        container.bind(EditDiagramLocker).toSelf().inSingletonScope()
        container.rebind(KeyTool).to(TheiaKeyTool).inSingletonScope();

        container.bind(LSTheiaDiagramServerProvider).toProvider<LSTheiaDiagramServer>((context) => {
            return () => {
                return new Promise<LSTheiaDiagramServer>((resolve) => {
                    resolve(context.container.get(LSTheiaDiagramServer));
                });
            };
        });

        return container
    }
}