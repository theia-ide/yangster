/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from "inversify"
import URI from "@theia/core/lib/common/uri"
import { Emitter, Event, MaybePromise } from "@theia/core/lib/common"
import { Widget } from "@phosphor/widgets"

@injectable()
export class DiagramWidgetRegistry {
    protected idSequence = 0
    protected readonly widgets = new Map<string, MaybePromise<Widget>>()
    protected readonly onWidgetsChangedEmitter = new Emitter<void>()

    onWidgetsChanged(): Event<void> {
        return this.onWidgetsChangedEmitter.event
    }

    getWidgetCount(): number {
        return this.widgets.size
    }

    getOpenedWidgets(): Widget[] {
        return Array.from(this.widgets.values()).filter(widget => widget instanceof Widget) as Widget[]
    }

    getWidget(uri: URI, diagramType: string): Promise<Widget> | undefined {
        const widget = this.widgets.get(this.getKey(uri, diagramType))
        if (widget) {
            return Promise.resolve(widget)
        }
        return undefined
    }

    addWidget(uri: URI, diagramType: string, widget: Widget): void {
        if (widget.id === undefined)
            widget.id = this.nextId()
        this.widgets.set(this.getKey(uri, diagramType), widget)
        this.onWidgetsChangedEmitter.fire(undefined)
    }

    removeWidget(uri: URI, diagramType: string): void {
        if (this.widgets.delete(this.getKey(uri, diagramType))) {
            this.onWidgetsChangedEmitter.fire(undefined)
        }
    }

    protected getKey(uri: URI, diagramType: string): string {
        return uri.toString() + '#' + diagramType
    }

    public nextId(): string {
        return `widget-${this.idSequence++}`
    }
}
