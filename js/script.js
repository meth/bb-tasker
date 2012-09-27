define(['jquery', 'backbone', 'models/tasker', 'views/list', 'views/form', 'views/task', 'views/form'], function( $, Backbone, Tasker, ListView, TaskView, FormView )
{
    var AppRouter = Backbone.Router.extend( {
        routes: {
            'add': 'add',
            'view-:id': 'view',
            'edit-:id': 'add',
            '*home': 'home'
        },
        views: {},
        tasks: {},
        initialize: function ()
        {
            this.tasks = new Tasker();
            this.views.listtodo = new ListView( {collection: this.tasks.get( 'tasks' )} );
            this.views.listdone = new ListView( {collection: this.tasks.get( 'done' ), el: document.getElementById( 'tasklist-done' )} );
            this.views.task = new TaskView();
            this.views.form = new FormView( {collection: this.tasks.get( 'tasks' )} );

            this.tasks.get( 'tasks' ).on( 'add remove change', this.goToHome, this );

            this.tasks.get( 'tasks' ).fetch();
        },
        showOnly: function ( section )
        {
            $( 'div.hero-unit' ).hide();
            $( '#' + section ).show();
            $( 'li', 'ul.nav' ).removeClass( 'active' );
            $( 'a[href="#' + section + '"]', 'ul.nav' ).parent().addClass( 'active' );
        },
        goToHome: function ()
        {
            this.navigate( 'home', {trigger: true} );
        },
        home: function ( tab )
        {
            this.showOnly( 'home' );
            this.views.listtodo.showTab( tab );
        },
        add: function ( taskid )
        {
            this.showOnly( 'add' );

            if ( taskid )
            {
                this.views.form.editTask( taskid );
            }
            else
            {
                this.views.form.resetForm();
            }
        },
        view: function ( taskid )
        {
            this.showOnly( 'view' );
            this.views.task.showTask( this.tasks.get( 'tasks' ).getByCid( taskid ) );
        }
    } );

    return AppRouter;
});