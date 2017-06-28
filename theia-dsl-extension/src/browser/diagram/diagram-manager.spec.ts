/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import "reflect-metadata"
import "mocha"
import { expect } from "chai"
import { Container, ContainerModule, injectable, inject } from "inversify"

@injectable()
class Connector {
    static counter: number = 0
    c: number

    constructor() {
        this.c = Connector.counter++
    }

}

@injectable()
abstract class AbstractManager {
    @inject(Connector) connector: Connector
}

@injectable()
class Manager0 extends AbstractManager {
}

@injectable()
class Manager1 extends AbstractManager {
}

const m0 = Symbol('Manager0')
const m1 = Symbol('Manager1')

describe('inversify', () => {
    it('error', () => {
        const module = new ContainerModule(bind => {
            bind(Connector).to(Connector).inSingletonScope()
            bind(Manager0).to(Manager0).inSingletonScope()
            bind(Manager1).to(Manager1).inSingletonScope()
            bind(m0).toDynamicValue(c => c.container.get(Manager0))
            bind(m1).toDynamicValue(c => c.container.get(Manager1))
        })

        const container = new Container()
        container.load(module)
        const manager0 = container.get(Manager0)
        const manager1 = container.get(Manager1)
        expect(manager0.connector.c).to.be.equal(manager1.connector.c)
        const m0inst = container.get<Manager0>(m0)
        const m1inst = container.get<Manager1>(m1)
        expect(m0inst.connector.c).to.be.equal(m1inst.connector.c)

    })
})