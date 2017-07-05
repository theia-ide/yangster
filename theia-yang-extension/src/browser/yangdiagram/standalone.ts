// Initialize model
import { SEdge, SGraphSchema, SNode } from "sprotty/lib"

export function createYangDiagram() {

    const node0 = {
        id: 'node0',
        type: 'node:class',
        position: {
            x: 30,
            y: 10
        },
        layout: 'vbox',
        children: [
            {
                id: 'node0_classname',
                type: 'label:heading',
                text: 'Foo'
            },
            {
                id: 'node0_attrs',
                type: 'comp:comp',
                layout: 'vbox',
                children: [
                    {
                        id: 'node0_op2',
                        type: 'label:text',
                        text: 'name: string'
                    }
                ],
            },
            {
                id: 'node0_ops',
                type: 'comp:comp',
                layout: 'vbox',
                children: [
                    {
                        id: 'node0_op0',
                        type: 'label:text',
                        text: '+ foo(): integer'
                    }, {
                        id: 'node0_op1',
                        type: 'label:text',
                        text: '# bar(x: string): void'
                    }
                ],
            }
        ]
    }
    const node1 = {
        id: 'node1',
        type: 'node:class',
        position: {
            x: 55,
            y: 200
        },
        layout: 'vbox',
        children: [
            {
                id: 'node1_classname',
                type: 'label:heading',
                text: 'Bar'
            },
            {
                id: 'node1_attrs',
                type: 'comp:comp',
                layout: 'vbox',
                children: [
                    {
                        id: 'node1_op2',
                        type: 'label:text',
                        text: 'name: string'
                    }
                ],
            },
            {
                id: 'node1_ops',
                type: 'comp:comp',
                layout: 'vbox',
                children: [
                    {
                        id: 'node1_op0',
                        type: 'label:text',
                        text: '+ foo(): Foo'
                    },
                    {
                        id: 'node1_op1',
                        type: 'label:text',
                        text: '+ bla(): Bla'
                    }

                ],
            }
        ]
    }
    const node2 = {
        id: 'node2',
        type: 'node:class',
        position: {
            x: 130,
            y: 400
        },
        layout: 'vbox',
        children: [
            {
                id: 'node2_classname',
                type: 'label:heading',
                text: 'Bla'
            },
            {
                id: 'node2_attrs',
                type: 'comp:comp',
                layout: 'vbox',
                children: [
                    {
                        id: 'node2_op2',
                        type: 'label:text',
                        text: 'name: string'
                    }
                ],
            },
            {
                id: 'node2_ops',
                type: 'comp:comp',
                layout: 'vbox',
                children: [
                    {
                        id: 'node2_op0',
                        type: 'label:text',
                        text: '+ talk(): string'
                    }

                ],
            }
        ]
    }
    const edge = {
        id: 'edge',
        type: 'edge:composition',
        sourceId: node0.id,
        targetId: node1.id
    } as SEdge
    const edge2 = {
        id: 'edge2',
        type: 'edge:dashed',
        sourceId: node1.id,
        targetId: node2.id
    }
    const module = {
        id: 'module',
        type: 'node:module',
        position: {
            x: 100,
            y: 300
        },
        size: {
            width: 400,
            height: 500
        },
        children: [{
            id: 'module_title',
            type: 'label:heading',
            text: 'Testtitel:Modul1',
            position: {
                x: 5,
                y: 5
            }
        },
            {
                id: 'module_note',
                type: 'node:note',
                position: {
                    x: 370,
                    y: 5
                }
            }, node0, node1, node2, edge, edge2]
    } as SNode

    const module2 = {
        id: 'module2',
        type: 'node:module',
        position: {
            x: 200,
            y: 100
        },
        size: {
            width: 300,
            height: 50
        },
        children: [{
            id: 'module2_title',
            type: 'label:heading',
            text: 'external:Modul2',
            position: {
                x: 5,
                y: 5
            }
        }]
    } as SNode

    const edge3 = {
        id: 'edge3',
        type: 'edge:import',
        sourceId: module2.id,
        targetId: module.id
    } as SEdge

    const graph: SGraphSchema = {id: 'graph', type: 'graph', children: [module, module2, edge3]}

    return graph
}