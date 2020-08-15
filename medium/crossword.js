// puzzle of the week Aug 2nd->8th, 2020
// puzzle: https://www.codingame.com/training/medium/crossword
// rating: medium... easy concept/theory crafting, difficult to print, medium
// time: 2-3 days

/************************************************************************
 *                                                                      *
 *              TODO: let's look into optimizing this eventually        *
 *                                                                      *
 ************************************************************************/

const H1 = readline();
const H2 = readline();
const V1 = readline();
const V2 = readline();

const find_in_string = (c, index, hstr, hmatches) => {
    let startIndex = 0;
    let findex = 0;
    while ((findex = hstr.indexOf(c, startIndex)) > -1) {
        startIndex = findex + 1;
        hmatches.push([c, index, findex, hstr.length]); // character, index on vertical, index on horizontal, len of horizontal, beginning/end maybe not needed? 
    }   
}

const filter_invalid_matches_by_match = (array, match) => array.filter(check => check[4] === match[4] && ((match[1] - check[1]) >= 2 || (check[1] - match[1]) >= 2) && (((match[3]-match[2]) > 2 && (check[3] - check[2]) > 2) || (check[2] > 1 && match[2] > 1)));
const filter_invalid_by_position = (array, pos) => array.filter(check => Math.abs(pos - check[2]) >= 2 );
const filter_invalid_by_position_match = (array, first_group_orientation, vert_pos) => array.filter(check => vert_pos - check[1] > 0 === first_group_orientation);
const filter_invalid_by_gap = (array, val, gap, idx, abs = true) => array.filter(check => (abs ? Math.abs(val - check[idx]) : val - check[idx]) === gap);

const replace_char_at = (origString, replaceChar, index) => {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

const helper_lines_creator = (f_word, f_idx, s_word, s_idx, x, y, y_starts_at, base_word_len, limit) => {
    let pp = [];
    while(x < limit) {
        let line = '.'.repeat(base_word_len);
        line = replace_char_at(line, f_word.charAt(x), f_idx);
        if (y_starts_at <= x && x < s_word.length && s_word.charAt(y)) {
            line = replace_char_at(line, s_word.charAt(y), s_idx); 
            y++;
        }
        pp.push(line);
        x++;
    }
    return [pp, x, y];
}

const pretty_print = (matches) => {
    h1v1_vert_idx = matches[0][1];
    h1v2_vert_idx = matches[2][1];
    h2v1_vert_idx = matches[1][1];
    h2v2_vert_idx = matches[3][1];

    h1v1_hor_idx = matches[0][2];
    h1v2_hor_idx = matches[2][2];
    h2v1_hor_idx = matches[1][2];
    h2v2_hor_idx = matches[3][2];

    let w1 = H1;
    let w2 = H2;
    let f_word = V1;
    let s_word = V2;


    if (h1v1_vert_idx > h2v1_vert_idx) { 
        h1v1_vert_idx = matches[3][1];
        h1v2_vert_idx = matches[1][1];
        h2v1_vert_idx = matches[2][1];
        h2v2_vert_idx = matches[0][1];

        h1v1_hor_idx = matches[3][2];
        h1v2_hor_idx = matches[1][2];
        h2v1_hor_idx = matches[2][2];
        h2v2_hor_idx = matches[0][2];

        w1 = H2;
        w2 = H1;
        f_word = V2;
        s_word = V1;
    }

    let f_idx = h1v1_hor_idx;
    let s_idx = h1v2_hor_idx;
    let invert_vert = h1v1_vert_idx < h1v2_vert_idx;

    if (h1v1_vert_idx < h1v2_vert_idx) {
        f_word = V1;
        s_word = V2;

        f_idx = h1v2_hor_idx;
        s_idx = h1v1_hor_idx;
    }

    let pp = [];
    let clen_top = h1v1_vert_idx >= h1v2_vert_idx ? h1v1_vert_idx : h1v2_vert_idx;
    let y = 0, x =0;
    let y_starts_at = h1v1_vert_idx >= h1v2_vert_idx ? h1v1_vert_idx - h1v2_vert_idx : h1v2_vert_idx - h1v1_vert_idx;

    let min_len = H1.length > H2.length ? H1.length : H2.length;

    // builds top
    let helper_array = helper_lines_creator(f_word, f_idx, s_word, s_idx, x, y, y_starts_at, w1.length, clen_top);
    pp = [...helper_array[0]]
    x = helper_array[1], y = helper_array[2]

    pp.push(w1)
    x++;
    y++;

    // build mid
    let clen_mid = invert_vert ? h2v2_vert_idx : h2v1_vert_idx; // depends on x todo
    helper_array = helper_lines_creator(f_word, f_idx, s_word, s_idx, x, y, y_starts_at, w1.length, clen_mid);
    pp = [...pp, ...helper_array[0]]
    x = helper_array[1], y = helper_array[2]

    pp.push(w2)
    x++;
    y++;

    // build bot
    let clen_bot = f_word.length - h2v1_vert_idx > s_word.length - h2v2_vert_idx ? f_word.length: s_word.length;

    x = invert_vert ? h2v2_vert_idx + 1 : (f_word.length - h2v1_vert_idx > s_word.length - h2v2_vert_idx ? h2v1_vert_idx + 1: h2v2_vert_idx + 1);
    y = invert_vert ? h2v1_vert_idx + 1: (f_word.length - h2v1_vert_idx > s_word.length - h2v2_vert_idx ? h2v2_vert_idx + 1: h2v1_vert_idx + 1);
    let x_saved = x;
    f_idx = invert_vert ? h2v2_hor_idx : h2v1_hor_idx;
    s_idx = invert_vert ? h2v1_hor_idx : h2v2_hor_idx;
    if (f_word.length - h2v1_vert_idx < s_word.length - h2v2_vert_idx) {
        const temp_word = f_word, temp_idx = f_idx;
        f_word = s_word;
        f_idx = s_idx;
        s_word = temp_word;
        s_idx = temp_idx;
    }

    if (invert_vert) {
        helper_array = helper_lines_creator(s_word, s_idx, f_word, f_idx, y, x, y_starts_at, w2.length, clen_bot);
    } else {
        helper_array = helper_lines_creator(f_word, f_idx, s_word, s_idx, x, y, y_starts_at, w2.length, clen_bot);
    }
    pp = [...pp, ...helper_array[0]]
    x = helper_array[1], y = helper_array[2]

    // add padding .*
    let padding_left = Math.abs(h1v1_hor_idx - h2v1_hor_idx)
    if (h1v1_hor_idx > h2v1_hor_idx) {
        x = x_saved-1;
        y = clen_bot;
    }  else {
        x = 0;
        y = x_saved
        if (w2.length > w1.length) {
            y--;
        }
    }

console.error(x, y)
    while (x < y) {
        console.error('1',pp[x])
        pp[x] = '.'.repeat(padding_left).concat(pp[x]);
        if (min_len < pp[x].length) {
            min_len = pp[x].length;
        }
        x++;
    }

    for (x = 0; x < pp.length; x ++) {
        const len = pp[x].length;
        if (len < min_len) {
            pp[x] = pp[x].concat('.'.repeat(min_len - len));
        }
    }

    

    console.error(pp)
    console.log(pp.join('\n'));
}

// match arrays 
// [character, index on vertical, index on horizontal]
let h1v1 = []
let h2v1 = []
let h1v2 = []
let h2v2 = []


V1.split("").forEach((c, index) => {
    find_in_string(c, index, H1, h1v1);
    find_in_string(c, index, H2, h2v1);
});

V2.split("").forEach((c, index) => {
    find_in_string(c, index, H1, h1v2);
    find_in_string(c, index, H2, h2v2);
});

console.error(H1, H2, V1, V2)

if (H1.length < 3 || H2.length < 3 || V1.length < 3 || V2.length < 3) {
    console.log("0");
} else if (h1v1.length === 0 || h1v2.length === 0 || h2v1.length === 0 || h2v2.length === 0) {
    console.log("0");
} else {
    const matches = []

    h1v1.forEach(match => {
        const h2v1FilteredArray = filter_invalid_matches_by_match(h2v1, match);

        if (h2v1FilteredArray.length > 0) {
            const h1v2FilteredArray = filter_invalid_by_position(h1v2, match[2]);
            if (h1v2FilteredArray.length > 0) {
                h2v1FilteredArray.forEach(match2 => {
                    const h2v2FilteredArray = filter_invalid_by_position(h2v2, match2[2]);

                    if (h2v2FilteredArray.length > 0) {
                        h1v2FilteredArray.forEach(match3 => {
                        let finalFilteredArray = filter_invalid_by_position_match(h2v2FilteredArray, match[1] - match2[1] > 0, match3[1])
                        // console.error('count: ', finalFilteredArray.length)
                        finalFilteredArray = filter_invalid_by_gap(finalFilteredArray, match3[1], Math.abs(match[1] - match2[1]), 1);
                        // console.error('count: ', finalFilteredArray.length)
                        finalFilteredArray = filter_invalid_by_gap(finalFilteredArray, match3[2], Math.abs(match[2] - match2[2]), 2);

                        finalFilteredArray = filter_invalid_by_gap(finalFilteredArray, match2[2], Math.abs(match[2] - match3[2]), 2);
                        finalFilteredArray = filter_invalid_by_gap(finalFilteredArray, match2[2], match[2] - match3[2], 2, false);
                        finalFilteredArray.forEach(match4 => matches.push([match, match2, match3, match4])) // h1v1, h2v1, h1v2, h2v2
                         })
                    }                    
                });
            }
        }
    });

    if (matches.length === 1){
        pretty_print(matches[0]);
    } else {
        console.error('matches', matches)//
        // console.error(matches[0])
        // // pretty_print(matches[0]);
        // for (let x = 0; matches.length; x++) {
        //     pretty_print(matches[x]);
        // }
        console.log(matches.length);
        // console.log('......L.....\n......U.....\n......K.....\n.DAREDEVIL..\n......C.R...\nJESSICAJONES\n......G.N...\n......E.F...\n........I...\n........S...\n........T...')
    }
}

