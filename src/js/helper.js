var helper = {
    generateNoteDates : function() {
        return {
            'unique': moment().format('YYYYMMDDHHmmssSS'),
            'display': moment().format('MMMM Do YYYY, h:mm'),
        };
    },
    sortObject : function(unsorted) {
        var sorted = {};
        Object.keys(unsorted).sort().forEach(function(key) {
            sorted[key] = unsorted[key];
        });
        return sorted;
    },
    randomNoteContent : function() {
        return this.noteContents[Math.floor(Math.random() * this.noteContents.length)];
    },
    focusElement : function(element) {
        $('#' + element).focus();
    },
    noteContents: [
        'A whole new world!',
        'Let\'s make some notes!',
        'You could be about to write the next best seller! Although I wouldn\'t suggest doing that here.',
        'It\'s time to write notes and chew bubble gum… and you\'re all outta gum.',
        'It\'s a-me, Cardios!',
        'Would you kindly… write a note.',
        'Notes... Notes never change.',
        'It\'s dangerous to go alone, write a note!',
        'Praise the note!',
        'You can\'t hide from the Grim Reaper. Especially when he\'s got a note.',
        'The note is a lie.',
        'Stay awhile and write a note!'
    ]
}
