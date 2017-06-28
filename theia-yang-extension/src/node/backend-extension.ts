/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, ContainerModule } from "inversify"
import { BaseLanguageServerContribution, IConnection, LanguageServerContribution } from "theia-core/lib/languages/node"

const EXECUTABLE = './node_modules/theia-yang-extension/build/yang-language-server.jar'

@injectable()
class YangLanguageServerContribution extends BaseLanguageServerContribution {

    readonly id = 'yang'
    readonly name = 'Yang'

    readonly description = {
        id: 'yang',
        name: 'Yang',
        documentSelector: ['yang'],
        fileEvents: [
            '**/*.yang'
        ]
    }

    start(clientConnection: IConnection): void {
        const command = 'java'
        const args: string[] = [
            '-jar',
            EXECUTABLE,
            // 'debug'
        ]
        const serverConnection = this.createProcessStreamConnection(command, args)
        this.forward(clientConnection, serverConnection)
    }

}

export default new ContainerModule(bind => {
    bind(LanguageServerContribution).to(YangLanguageServerContribution).inSingletonScope()
})