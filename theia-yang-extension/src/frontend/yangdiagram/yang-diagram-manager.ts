/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { DiagramManagerImpl } from "../diagram/diagram-manager"
import { inject, injectable } from 'inversify'
import { LanguageClientContribution } from '@theia/languages/lib/browser'
import { YangLanguageClientContribution } from '../language/yang-language-client-contribution'
import { TheiaSprottyConnector } from '../diagram/theia-sprotty-connector'
import { TheiaFileSaver } from "../diagram/theia-file-saver"

@injectable()
export class YangDiagramManager extends DiagramManagerImpl {

    readonly diagramType = 'yang-diagram'
    readonly iconClass = 'fa fa-microchip'

    readonly diagramConnector: TheiaSprottyConnector

    constructor(@inject(YangLanguageClientContribution) languageClientContribution: LanguageClientContribution,
                @inject(TheiaFileSaver) theiaFileSaver: TheiaFileSaver) {
        super()
        this.diagramConnector = new TheiaSprottyConnector(languageClientContribution, theiaFileSaver)
    }

    get label() {
        return 'Yang diagram'
    }
}