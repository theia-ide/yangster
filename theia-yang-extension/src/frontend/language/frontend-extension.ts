/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from "inversify"
import { CommandContribution } from 'theia-core/lib/application/common';
import { LanguageClientContribution } from "theia-core/lib/languages/browser"
import { YangLanguageClientContribution } from "./yang-language-client-contribution"
import { DiagramConfiguration } from "../diagram/diagram-configuration"
import { YangDiagramConfiguration } from "../yangdiagram/di.config"
import { DiagramManager, DiagramManagerProvider } from "../diagram/diagram-manager"
import { YangDiagramManager } from "../yangdiagram/yang-diagram-manager"
import { FrontendApplicationContribution, OpenHandler } from "theia-core/lib/application/browser"
import {configuration, monarchLanguage} from "./yang-monaco-language"
import "sprotty/css/sprotty.css"
import "../../../src/frontend/css/page.css"
import "../../../src/frontend/css/theia.css"
import "../../../src/frontend/css/diagram.css"
import { YangCommandContribution } from "./yang-commands";



export default new ContainerModule(bind => {
    monaco.languages.register({
        id: 'yang',
        aliases: ['Yang', 'yang'],
        extensions: ['.yang'],
        mimetypes: ['text/yang']
    })
    monaco.languages.onLanguage('yang', () => {
        monaco.languages.setLanguageConfiguration('yang', configuration);
        monaco.languages.setMonarchTokensProvider('yang', monarchLanguage);
    });
    bind(CommandContribution).to(YangCommandContribution).inSingletonScope();
    bind(YangLanguageClientContribution).toSelf().inSingletonScope()
    bind(LanguageClientContribution).toDynamicValue(ctx => ctx.container.get(YangLanguageClientContribution))
    bind(DiagramConfiguration).to(YangDiagramConfiguration).inSingletonScope()
    bind(DiagramManagerProvider).toProvider<DiagramManager>(context => {
        return () => {
            return new Promise<DiagramManager>((resolve) =>
                resolve(context.container.get(YangDiagramManager))
            )
        }
    }).whenTargetNamed('yang-diagram')
    bind(YangDiagramManager).toSelf().inSingletonScope()
    bind(FrontendApplicationContribution).toDynamicValue(context => context.container.get(YangDiagramManager))
    bind(OpenHandler).toDynamicValue(context => context.container.get(YangDiagramManager))
})