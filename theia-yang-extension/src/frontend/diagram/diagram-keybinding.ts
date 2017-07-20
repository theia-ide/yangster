/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { DiagramCommands } from './diagram-commands'
import { DiagramWidget } from './diagram-widget'
import { injectable, inject } from 'inversify'
import { CommonCommands, Key, KeybindingRegistry, KeybindingContribution, KeybindingContext, Keybinding, KeyCode, Modifier } from '@theia/core/lib/common'
import { FrontendApplication } from '@theia/core/lib/browser/frontend-application'

@injectable()
export class DiagramKeybindingContext implements KeybindingContext {

    constructor(@inject(FrontendApplication) protected readonly application: FrontendApplication) {
    }

    id = 'diagram.keybinding.context'

    isEnabled(arg?: Keybinding) {
        return this.application.shell.currentWidget instanceof DiagramWidget
    }
}

@injectable()
export class DiagramKeybindingContribution implements KeybindingContribution {

    constructor(@inject(DiagramKeybindingContext) protected readonly diagramKeybindingContext: DiagramKeybindingContext) { }

    registerKeyBindings(registry: KeybindingRegistry): void {
        [
            {
                commandId: DiagramCommands.CENTER,
                context: this.diagramKeybindingContext,
                keyCode: KeyCode.createKeyCode({ first: Key.KEY_C, modifiers: [Modifier.M1] })
            },
            {
                commandId: DiagramCommands.FIT,
                context: this.diagramKeybindingContext,
                keyCode: KeyCode.createKeyCode({ first: Key.KEY_F, modifiers: [Modifier.M1] })
            },
            {
                commandId: DiagramCommands.EXPORT,
                context: this.diagramKeybindingContext,
                keyCode: KeyCode.createKeyCode({ first: Key.KEY_E, modifiers: [Modifier.M1] })
            },
            {
                commandId: DiagramCommands.SELECT_ALL,
                context: this.diagramKeybindingContext,
                keyCode: KeyCode.createKeyCode({ first: Key.KEY_A, modifiers: [Modifier.M1] })
            },
            {
                commandId: CommonCommands.EDIT_UNDO,
                context: this.diagramKeybindingContext,
                keyCode: KeyCode.createKeyCode({ first: Key.KEY_Z, modifiers: [Modifier.M1] })
            },
            {
                commandId: CommonCommands.EDIT_REDO,
                context: this.diagramKeybindingContext,
                keyCode: KeyCode.createKeyCode({ first: Key.KEY_Z, modifiers: [Modifier.M1, Modifier.M2] })
            }
        ].forEach(binding => {
            registry.registerKeyBinding(binding)
        })
    }
}
