const western = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const indianPhonetic = ['S', 'r', 'R', 'g', 'G', 'm', 'M', 'P', 'd', 'D', 'n', 'N'];


const indicScripts = {
    "bn": [
        ["সা়", "ঋা়", "রা়", "জ্ঞা়", "গা়", "মা়", "ক্ষা়", "পা়", "দা়", "ধা়", "ণা়", "না়"],
        ["সা", "ঋা", "রা", "জ্ঞা", "গা", "মা", "ক্ষা", "পা", "দা", "ধা", "ণা", "না"],
        ["র্সা", "র্ঋা", "র্রা", "র্জ্ঞা", "র্গা", "র্মা", "র্ক্ষা", "র্পা", "র্দা", "র্ধা", "র্ণা", "র্না"]
    ],
    "hi": [
        ["सा़", "रे़॒", "रे़", "ग़॒", "ग़", "म़", "म़॑", "प़", "ध़॒", "ध़", "ऩी॒", "ऩी"],
        ["सा", "रे॒", "रे", "ग॒", "ग", "म", "म॑", "प", "ध॒", "ध", "नी॒", "नी"],
        ["सां", "रें॒", "रें", "गं॒", "गं", "मं", "मं॑", "पं", "धं॒", "धं", "नीं॒", "नीं"]
    ]
};

export default class SwaralipiCore {
    /**
     * 
     * @param {String} scale scale Major scale for Indian Notation 
     * @param {*} octave Only 3 octaves can be represented in the Indian Notation System (aka Swaralipi). So if you provide 
     * 4, it will use 3rd, 4th & 5th octave
     * @param {*} lang Language code in ISO 639-1 format,
     */
    constructor(scale = "C", octave = "4", lang = "bn") {
        this.scale = scale;
        this.octave = octave;
        this.lang = lang;

        this.init();
    }

    /**
     * Initialize and generates all lookup table
     */
    init() {
        this.initScaleMap(this.scale, this.octave);
        this.initTranslationMap();
    }

    /**
     * Initializes scale lookup table 
     * 
     * @param {String} scale 
     * @param {Number} octave 
     */
    initScaleMap(scale, octave) {
        console.log("scale: " + scale + ", octave: " + octave)
        let index = western.indexOf(scale);
        if (index == -1) {
            throw "Scale not supported: " + scale;
        }

        let allNotes = [];
        for (let oct = 1; oct <= 8; oct++) {
            western.forEach(note => {
                allNotes.push(note + oct);
            })
        }

        let allPhonetic = []
        for (let oct = 0; oct <= 2; oct++) {
            indianPhonetic.forEach(note => {
                allPhonetic.push(note + oct);
            })
        }

        let start = allNotes.indexOf(scale + (octave - 1))

        this.scaleMap = {};
        for (let j = start, i = 0; j < start + 36; j++, i++) {
            this.scaleMap[allNotes[j]] = allPhonetic[i]
        }
    }

    /**
     * Initializes translation lookup table
     */
    initTranslationMap() {
        this.translationMap = {};
        for (const lng in indicScripts) {
            const element = indicScripts[lng];
            element.forEach((arr, octave) => {
                if (this.translationMap[lng] == undefined) {
                    this.translationMap[lng] = {};
                }
                let noteObj = {};
                arr.forEach((note, i) => {
                    noteObj[indianPhonetic[i]] = note;
                })
                this.translationMap[lng][octave] = noteObj
            });
        }
    }

    /**
     * It will return specific note in Indian format as per Indian Notation System (Swaralipi)
     * It will return empty string if it is out of octave range
     * 
     * @param {String} noteWithOctave Provide western note with octave i.e. C1, D#2 etc (provide sharp instead of flat)          
     */
    toIndianNote(noteWithOctave) {
        let phoneticNote = this.scaleMap[noteWithOctave];
        if (phoneticNote) {
            let newNote = phoneticNote.substring(0, phoneticNote.length - 1);
            let newOctave = phoneticNote.substring(phoneticNote.length - 1);

            let translatedNote = this.translationMap[this.lang][newOctave][newNote];
            return translatedNote;
        }
        return "";
    }
}
