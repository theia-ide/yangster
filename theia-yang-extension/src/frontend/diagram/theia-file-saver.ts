/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify'
import { ExportSvgAction } from 'sprotty/lib'
import { FileSystem } from 'theia-core/lib/filesystem/common'
import { WorkspaceService } from 'theia-core/lib/workspace/browser'
import { FileDialogFactory } from 'theia-core/lib/filesystem/browser/file-dialog'
import { DirNode } from "theia-core/lib/filesystem/browser"

@injectable()
export class TheiaFileSaver {
    constructor(
        @inject(FileSystem) protected readonly fileSystem: FileSystem,
        @inject(FileDialogFactory) protected readonly fileDialogFactory: FileDialogFactory,
        @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService
    ) {
    }

    save(action: ExportSvgAction) {
        this.fileSystem.getRoots().then(roots => {
            const node = DirNode.createRoot(roots[0])
            const fileDialog = this.fileDialogFactory({
                title: 'Save as...'
            })
            fileDialog.model.navigateTo(node)
            fileDialog.open().then(node => {
                if (node !== undefined)
                    this.fileSystem.createFile(node.fileStat.uri, { content: action.svg })
            })
        })
    }
}