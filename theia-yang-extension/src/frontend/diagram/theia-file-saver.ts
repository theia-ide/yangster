/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify'
import { ExportSvgAction } from 'sprotty/lib'
import { FileSystem } from '@theia/filesystem/lib/common'

@injectable()
export class TheiaFileSaver {
    constructor(@inject(FileSystem) protected readonly fileSystem: FileSystem) {
    }

    save(sourceUri: string, action: ExportSvgAction) {
        this.getNextFileName(sourceUri).then(fileName =>
            this.fileSystem.createFile(fileName, { content: action.svg })
        )
    }

    getNextFileName(sourceUri: string): Promise<string> {
        return new Promise<string>(resolve => this.tryNextFileName(sourceUri, 0, resolve))
    }

    tryNextFileName(sourceURI: string, count: number, resolve: (fileName: string) => void) {
        const currentName = sourceURI + (count === 0 ? '' : count) + '.svg'
        this.fileSystem.exists(currentName).then(exists => {
            if (!exists)
                resolve(currentName)
            else
                this.tryNextFileName(sourceURI, ++count, resolve)
        })
    }
}