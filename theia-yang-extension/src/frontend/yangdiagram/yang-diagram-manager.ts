/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { DiagramManagerImpl } from "../diagram/diagram-manager"
import { inject, injectable } from 'inversify'
import { LanguageClientContribution } from 'theia-core/lib/languages/browser'
import { YangLanguageClientContribution } from '../language/yang-language-client-contribution'
import { TheiaDiagramServerConnector } from "../diagram/theia-diagram-server-connector"
import { DiagramConfigurationRegistry } from "../diagram/diagram-configuration"
import { TheiaFileSaver } from "../diagram/theia-file-saver"

@injectable()
export class YangDiagramManager extends DiagramManagerImpl {

    readonly diagramType = 'yang-diagram'
    readonly iconClass = 'fa fa-microchip'

    readonly diagramConnector: TheiaDiagramServerConnector

    constructor(@inject(DiagramConfigurationRegistry) diagramConfigurationRegistry: DiagramConfigurationRegistry,
                @inject(YangLanguageClientContribution) languageClientContribution: LanguageClientContribution,
                @inject(TheiaFileSaver) theiaFileSaver: TheiaFileSaver) {
        super()
        this.diagramConnector = new TheiaDiagramServerConnector(languageClientContribution, diagramConfigurationRegistry, theiaFileSaver)
    }

    get label() {
        return 'Yang diagram'
    }
}