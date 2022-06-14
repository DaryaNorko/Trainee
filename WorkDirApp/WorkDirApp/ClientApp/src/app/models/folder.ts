// export interface Folder {
//     name: string;
//     path: string;
//     children?: Folder[];
//     isHasChildren: boolean;
// }

export class Folder {
    constructor(
        public name: string,
        public level = 1,
        public expandable = false, // isHasChildren
        public isLoading = false,

    ) { }
    public path: string = "";
    public children?: Folder[]
}