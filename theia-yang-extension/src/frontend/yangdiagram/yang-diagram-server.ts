import { inject, injectable } from "inversify"
import { LSTheiaDiagramServer } from "sprotty-theia/lib"
import { IModelFactory, TYPES } from "sprotty";

@injectable()
export class YangDiagramServer extends LSTheiaDiagramServer {

    @inject(TYPES.IModelFactory) modelFactory: IModelFactory;

}
