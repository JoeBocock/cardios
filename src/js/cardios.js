var cardios = {
    notes: {},
    loadNav : function() {
        this.notes = helper.sortObject(this.notes);
        $('.nav-content-section').empty();
        for(var noteId in this.notes) {
            var output = $('template#nav-option').html()
                .replace(/(\{id\})/g, noteId)
                .replace(/(\{title\})/g, this.notes[noteId]['title']);

            $('.nav-content-section').prepend(output);
        }
        $('.nav-content-section').prepend($('template#nav-option-new-note').html());
    },
    loadNote : function(noteId) {
        let noteData = this.notes[noteId];

        if (typeof noteData == 'undefined') {
            this.loadNav();
        } else {
            this.setCurrentNote(noteId);
            var output = $('template#note-template').html()
                .replace(/(\{id\})/g, noteId)
                .replace(/(\{title\})/g, noteData.title)
                .replace(/(\{created\})/g, noteData.created)
                .replace(/(\{updated\})/g, noteData.updated)
                .replace(/(\{contents\})/g, noteData.contents);

            $('.content-column').empty();
            $('.content-column').append(output);

            interface.updateNav(noteId);
            $('.collapsible').collapsible();

            M.textareaAutoResize($('#note-contents'));
            this.registerSaveHandler();
        }
    },
    newNote : function(title) {
        var dates = helper.generateNoteDates();

        var newNote = {
            "title": title,
            "created": dates.display,
            "updated": dates.display,
            "contents": helper.randomNoteContent()
        };

        var noteId = dates.unique;

        this.notes[noteId] = newNote;
        $.when($.ajax(this.loadNav())).then(this.loadNote(noteId));
    },
    updateNote : function(field, value) {
        let currentNote = $('input[name="current-note"]').val();

        if (field == 'unique') {
            cardios.setCurrentNote(value);

            let noteValues = this.notes[currentNote];
            delete this.notes[currentNote];

            this.notes[value] = noteValues;
        } else {
            this.notes[currentNote][field] = value;
        }
    },
    deleteNote : function() {
        var instance = M.Modal.getInstance(document.getElementById("delete-note-modal"));
        let currentNote = $('input[name="current-note"]').val();

        delete this.notes[currentNote];
        instance.close();
        this.saveNotes();
        $('.content-column').empty();
    },
    saveNotes : function() {
        dataManager.create('cardioslog', this.notes);
        this.loadNav();
    },
    setCurrentNote : function(noteId) {
        $('input[name="current-note"]').val(noteId);
    },
    captureTitle : function() {
        var instance = M.Modal.getInstance(document.getElementById("new-note-modal"));
        var title = $('#new-note-title').val();
        $('#new-note-title').val('');

        if (title != '') {
            instance.close();
            $('#new-note-header').html('Create a new note...');
            this.newNote(title);
        }
    },
    registerSaveHandler : function() {
        var typingTimer;
        var finishedTypingInterval = 1000;

        $('#note-contents').keyup(function() {
            $('#progress-bar').removeClass('determinate');
            $('#progress-bar').addClass('indeterminate');

            remote.getGlobal('clearTimeout')(typingTimer);
            typingTimer = remote.getGlobal('setTimeout')(cardios.typingFinished, finishedTypingInterval);
            M.textareaAutoResize($('#note-contents'));
        });
    },
    typingFinished : function() {
        var dates = helper.generateNoteDates();

        $('#progress-bar').removeClass('indeterminate');
        $('#progress-bar').addClass('determinate');

        cardios.updateNote('contents', $('#note-contents').val());
        cardios.updateNote('unique', dates.unique);
        cardios.updateNote('updated', dates.display);

        cardios.saveNotes();
        cardios.loadNote(dates.unique);
    },
    justClearStyling : function() {
        $('#progress-bar').removeClass('indeterminate');
        $('#progress-bar').addClass('determinate');
    }
}
