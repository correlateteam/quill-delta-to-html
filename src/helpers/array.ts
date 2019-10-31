
interface IArraySlice<T> {
    sliceStartsAt: number,
    elements: T[]
}

function preferSecond(arr: any[]): any {
    if (arr.length === 0) {
        return null;
    }
    return arr.length >= 2 ? arr[1] : arr[0];
};


function flatten (arr: any[]): any[] {
    return arr.reduce((pv: any[], v: any) => {
        return pv.concat(Array.isArray(v) ? flatten(v) : v);
    }, []);
};


/**
 * Returns a new array by putting consecutive elements satisfying predicate into a new 
 * array and returning others as they are. 
 * Ex: [1, "ha", 3, "ha", "ha"] => [1, "ha", 3, ["ha", "ha"]] 
 *      where predicate: (v, vprev) => typeof v === typeof vPrev
 */
function groupConsecutiveElementsWhile (arr: any[], 
    predicate: (currElm: any, prevElm: any) => boolean): any[] {
    var groups = [];

    var currElm, currGroup;
    for (var i = 0; i < arr.length; i++) {

        currElm = arr[i];

        if (i > 0 && predicate(currElm, arr[i - 1])) {
            currGroup = groups[groups.length - 1];
            currGroup.push(currElm);

        } else {
            groups.push([currElm]);
        }

    }
    return groups.map((g) => g.length === 1 ? g[0] : g);
};


/**
 * Returns consecutive list of elements satisfying the predicate starting from startIndex 
 * and traversing the array in reverse order. 
 */
function sliceFromReverseWhile<T> (arr: T[], startIndex: number,
    predicate: (currElm: T) => boolean): IArraySlice<T> {

    var result = {
        elements: [] as T[],
        sliceStartsAt: -1
    };
    for (var i = startIndex; i >= 0; i--) {
        if (!predicate(arr[i])) {
            break;
        }
        result.sliceStartsAt = i;
        result.elements.unshift(arr[i]);
    }
    return result;
};

function intersperse (arr: any[], item: any): any[] {
    return arr.reduce((pv: any[], v: any, index: number) => {
        pv.push(v);
        if (index < (arr.length - 1)) {
            pv.push(item);
        }
        return pv;
    }, []);
}

function partitionAtIndexes<T>(arr: T[], indexes: number[]): T[][] {
    if (!arr.length) {
        return [];
    }
    return indexes.map( (idx, i, all) => {
        return arr.slice( i === 0 ? 0 : all[i - 1] + 1, idx + 1);
    });
}

export {IArraySlice, preferSecond, flatten, groupConsecutiveElementsWhile, sliceFromReverseWhile, intersperse, partitionAtIndexes}