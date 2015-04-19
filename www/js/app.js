// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

      .state('app.home', {
          url: "/home",
          views: {
              'menuContent': {
                  templateUrl: "templates/home.html",
                  controller: 'HomeCtrl'
              }
          }
      })

      .state('app.teacher', {
          url: "/teacher",
          views: {
              'menuContent': {
                  templateUrl: "templates/teacher.html",
                  controller: 'TeacherCtrl'
              }
          }
      })

      .state('app.create-lesson', {
          url: "/create-lesson",
          views: {
              'menuContent': {
                  templateUrl: "templates/create-lesson.html",
                  controller: 'CreateLessonCtrl'
              }
          }
      })

      .state('app.lesson-list', {
          url: "/lesson-list",
          views: {
              'menuContent': {
                  templateUrl: "templates/lesson-list.html",
                  controller: 'LessonListCtrl'
              }
          }
      })

      .state('app.show-lesson', {
          url: "/show-lesson/:lessonno",
          views: {
              'menuContent': {
                  templateUrl: "templates/show-lesson.html",
                  controller: 'ShowLessonCtrl'
              }
          }
      })

      .state('app.create-quiz', {
          url: "/create-quiz",
          views: {
              'menuContent': {
                  templateUrl: "templates/create-quiz.html",
                  controller: 'CreateQuizCtrl'
              }
          }
      })

      .state('app.create-question', {
          url: "/create-question",
          views: {
              'menuContent': {
                  templateUrl: "templates/create-question.html",
                  controller: 'CreateQuestionCtrl'
              }
          }
      })


      .state('app.pupil-list', {
          url: "/pupil-list",
          views: {
              'menuContent': {
                  templateUrl: "templates/pupil-list.html",
                  controller: 'PupilListCtrl'
              }
          }
      })

      .state('app.quiz-list', {
          url: "/quiz-list",
          views: {
              'menuContent': {
                  templateUrl: "templates/quiz-list.html",
                  controller: 'QuizListCtrl'
              }
          }
      })

      .state('app.question-list', {
          url: "/question-list/:quizno",
          views: {
              'menuContent': {
                  templateUrl: "templates/question-list.html",
                  controller: 'QuestionListCtrl'
              }
          }
      })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
          url: "/playlists",
          views: {
              'menuContent': {
                  templateUrl: "templates/playlists.html",
                  controller: 'PlaylistsCtrl'
              }
          }
      })

      .state('app.create-pupil', {
          url: "/create-pupil",
          views: {
              'menuContent': {
                  templateUrl: "templates/create-pupil.html",
                  controller: 'CreatePupilCtrl'
              }
          }
      })

      .state('app.pupil-account', {
          url: "/pupil-account",
          views: {
              'menuContent': {
                  templateUrl: "templates/pupil-account.html",
                  controller: 'PupilAccountCtrl'
              }
          }
      })


      .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
