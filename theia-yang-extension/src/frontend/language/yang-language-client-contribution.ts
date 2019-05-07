/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable, multiInject } from 'inversify'
import { LanguageClientFactory, Languages, Workspace } from '@theia/languages/lib/browser'
import { DiagramLanguageClientContribution, DiagramManagerProvider } from 'sprotty-theia/lib'

@injectable()
export class YangLanguageClientContribution extends DiagramLanguageClientContribution {

    readonly id = 'yang'
    readonly name = 'Yang'

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory,
        @multiInject(DiagramManagerProvider) protected diagramManagerProviders: DiagramManagerProvider[]) {
        super(workspace, languages, languageClientFactory, diagramManagerProviders)
    }

    protected get globPatterns() {
        return [
            '**/*.yang'
        ]
    }

    protected get documentSelector(): string[] {
        return [
            this.id
        ]
    }
}
