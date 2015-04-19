angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $firebaseArray) {
  // Form data for the login modal
  $scope.pData = {};
        $rootScope.teacher=true;


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

          if ($scope.pData.password=="a") {

              var ref = new Firebase('https://schulschublade.firebaseio.com/');
              $scope.pupils = $firebaseArray(ref);
              ref.child('pupils').orderByChild('first').equalTo($scope.pData.name).on('child_added',  function(childSnapshot, prevChildName) {
                  $rootScope.pupilArray=childSnapshot.val();
                  $rootScope.pupilArray.id=childSnapshot.key();
              });
              $rootScope.teacher=false;

          }
          if ($scope.pData.password=="b") {
              $scope.pData.name="lehrer";
              $scope.pData.id=1;
              $scope.pData.teacher=true;
              localStorage.setItem("name", JSON.stringify($scope.pData.name));
              localStorage.setItem("id", JSON.stringify($scope.pData.id));
              localStorage.setItem("teacher", JSON.stringify($scope.pData.teacher));
              $rootScope.teacher=true;
          }
      $scope.closeLogin();
  };




})

.controller('HomeCtrl', function($scope, $rootScope) {


        /*var getpData = function(){
            //pData holen
            $scope.pData=[];
            if(localStorage.getItem("teacher") === null)  {

                login();

            }
            else {
                var w = localStorage.getItem("name");
                $scope.pData.name =JSON.parse(w);
                var w = localStorage.getItem("teacher");
                $scope.pData.teacher =JSON.parse(w);

            }
        };
        getpData();*/

})

    .controller('CreatePupilCtrl', function($scope, $rootScope, $firebaseArray) {

        $scope.pupil=[];

        var ref = new Firebase('https://schulschublade.firebaseio.com/pupils/');
        $scope.pupils = $firebaseArray(ref);

        $scope.createPupil = function(){
            // add a new record to the list
            $scope.pupils.$add({
                first: $scope.pupil.first,
                last: $scope.pupil.last,
                points: 0
            });
        }

    })

    .controller('PupilListCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal) {



        var ref = new Firebase('https://schulschublade.firebaseio.com/pupils/');
        $scope.pupils = $firebaseArray(ref);

        $scope.deletePupil = function(id){
            console.log(id);
            var ret = $scope.pupils.$remove($scope.pupils.$getRecord(id));
            console.log(ret);
        }





        $scope.addPoints = function(id){
            // change a message and save it
            var item = $scope.pupils.$getRecord(id);
            item.points += 10;
            $scope.pupils.$save(item).then(function() {
                // data has been saved to Firebase
                console.log("ok");
            });
        }


    //ChangePupil Modal
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/change-pupil.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.changePupil = function(id) {

            $scope.item = $scope.pupils.$getRecord(id);
            $scope.id=id;


            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doSave = function() {
            console.log('Done save', $scope.loginData);

            // change a message and save it
            var item = $scope.pupils.$getRecord($scope.id);
            item=$scope.item;
            $scope.pupils.$save(item).then(function() {
                // data has been saved to Firebase
                console.log("ok");
            });

            $scope.closeLogin();
        };

    //ChangePupil Modal

     //Add Pupil Modal

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/create-pupil.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modalAdd = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeAdd = function() {
            $scope.modalAdd.hide();
        };

        // Open the login modal
        $scope.createPupil = function() {

            $scope.pupil=[];

            $scope.modalAdd.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doAdd = function() {
            console.log('Done save', $scope.loginData);

            // change a message and save it
            $scope.pupils.$add({
                first: $scope.pupil.first,
                last: $scope.pupil.last,
                password: $scope.pupil.password,
                points: 0
            });

            $scope.closeAdd();
        };


        //Add Modal Ende



    })


    .controller('CreateLessonCtrl', function($scope, $rootScope, $firebaseArray) {

        $scope.lesson= {
            date: 'date',
            topic: 'Gleichungen',
            content: 'Kapitel 1',
            exercises: 'S61 Nr4',
            quizid: '4'
        };

        var ref = new Firebase('https://schulschublade.firebaseio.com/lessons/');
        $scope.lessons = $firebaseArray(ref);

        /*$scope.createLesson = function(){
            // add a new record to the list
            $scope.lessons.$add({
                date: new Date().getTime(),
                topic: $scope.lesson.topic,
                content: $scope.lesson.content,
                exercises: $scope.lesson.exercises,
                quizid: $scope.lesson.quizid
            });
        }*/

    })

    .controller('LessonListCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal, $timeout) {



        var ref = new Firebase('https://schulschublade.firebaseio.com/lessons/');
        $scope.lessons = $firebaseArray(ref);

        var ref1 = new Firebase('https://schulschublade.firebaseio.com/quizzes/');
        $scope.quizzes = $firebaseArray(ref1);

        var ref2 = new Firebase('https://schulschublade.firebaseio.com/');



        $scope.deleteLesson = function(id){
            console.log(id);
            var ret = $scope.lessons.$remove($scope.lessons.$getRecord(id));
            console.log(ret);
        };

        $scope.showLesson = function(id){

            window.location='#/app/show-lesson/'+$scope.lessons.$getRecord(id).$id;
            console.log($scope.lessons.$getRecord(id).$id);
        }


    //Change Modal

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/change-lesson.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.changeLesson = function(id) {

            $scope.item = $scope.lessons.$getRecord(id);
            $scope.id=id;
            console.log($scope.item.date+" scope.item");

            $scope.item.date=new Date();


            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doSave = function() {
            console.log('Done save', $scope.loginData);

            // change a message and save it
            var item = $scope.lessons.$getRecord($scope.id);
            item=$scope.item;
            item.date=$scope.item.date.getTime();
            console.log(item.date+" item");
            $scope.lessons.$save(item).then(function() {
                // data has been saved to Firebase
                console.log("ok");
            });

            $scope.closeLogin();
        };


    //Change Modal Ende

    //Add Modal

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/create-lesson.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modalAdd = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeAdd = function() {
            $scope.modalAdd.hide();
        };

        // Open the login modal
        $scope.createLesson = function() {

            $scope.lesson=[];
            

            $scope.modalAdd.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doAdd = function() {
            console.log('Done save', $scope.loginData);

            ref2.child('quizzes').orderByChild('name').equalTo($scope.lesson.quizid).on('child_added',  function(childSnapshot, prevChildName) {
                /*$rootScope.pupilArray=childSnapshot.val();*/
                $scope.lesson.quizid=childSnapshot.key();
                console.log(childSnapshot.key());
            });


            $timeout(function() {
                // change a message and save it
                $scope.lessons.$add({
                    date: new Date().getTime(),
                    topic: $scope.lesson.topic,
                    content: $scope.lesson.content,
                    exercises: $scope.lesson.exercises,
                    quizid: $scope.lesson.quizid
                });

                $scope.closeAdd();
            }, 2000);


        };


        //Add Modal Ende



    })



    .controller('ShowLessonCtrl', function($scope, $rootScope, $firebaseArray, $stateParams,$timeout) {

        $scope.lessonno=$stateParams.lessonno;
        console.log($scope.lessonno);

        var ref = new Firebase('https://schulschublade.firebaseio.com/lessons/');
        $scope.lessons = $firebaseArray(ref);

        var ref1 = new Firebase('https://schulschublade.firebaseio.com/quizzes/');
        $scope.quizzes = $firebaseArray(ref1);


        var ref2 = new Firebase('https://schulschublade.firebaseio.com/questions/');
        $scope.allquestions = $firebaseArray(ref2);

        var ref3 = new Firebase('https://schulschublade.firebaseio.com/pupils/');
        $scope.pupils = $firebaseArray(ref3);

        $timeout(function() {
            /*console.log($scope.lessons);*/
            $scope.lesson = $scope.lessons.$getRecord($scope.lessonno);
            /*console.log($scope.lesson);*/


            $scope.quiz = $scope.quizzes.$getRecord($scope.lesson.quizid);

            $scope.shownquestions=[];

            for(var i=0;i<$scope.quiz.qlist.length;i++){
                /*console.log("Durchlauf"+i)*/
                for(var j=0;j<$scope.allquestions.length;j++){
                    if($scope.quiz.qlist[i]==$scope.allquestions[j].$id) {
                        /*console.log("yeah");*/
                        $scope.shownquestions.push($scope.allquestions[j]);
                    }
                }
            }
        }, 2000);
        console.log($scope.lessons);


        $scope.checkAnswer = function(id,answer){
            console.log(answer.toString()+"toString");
            console.log("Antwort wird geprüft");
            console.log($scope.allquestions.$getRecord(id).a+" Frage");
            console.log(answer.toString() + $scope.allquestions.$getRecord(id).a);

            if (answer == $scope.allquestions.$getRecord(id).a){
                console.log("sehr gut");

                    // change a message and save it
                    var item = $scope.pupils.$getRecord($rootScope.pupilArray.id);
                    item.points += 10;
                $rootScope.pupilArray=item.points;
                    $scope.pupils.$save(item).then(function() {
                        // data has been saved to Firebase
                        console.log("ok");
                    });
                alert("Glückwunsch, richtig! 10 Punkte für dich. Du hast nun "+item.points+" Punkte");

            }
            else {
                console.log("schlecht");
                alert("Leider falsch!");
            }



        }

    })


    .controller('CreateQuizCtrl', function($scope, $rootScope, $firebaseArray) {

        $scope.quiz= [
            name='1',
            id=1
        ];

        var ref = new Firebase('https://schulschublade.firebaseio.com/quizzes/');
        $scope.quizzes = $firebaseArray(ref);

        $scope.createQuiz = function(){
            // add a new record to the list
            $scope.quizzes.$add({
                name: $scope.quiz.name,
                id: $scope.quiz.id,
                qlist:["eins","zwei"]
            });
        }

    })

    .controller('CreateQuestionCtrl', function($scope, $rootScope, $firebaseArray) {

        $scope.question= [
            q='1=1?',
            a=true
        ];

        var ref = new Firebase('https://schulschublade.firebaseio.com/questions/');
        $scope.questions = $firebaseArray(ref);

        $scope.createQuestion = function(){
            // add a new record to the list
            $scope.questions.$add({
                q: $scope.question.q,
                a: $scope.question.a
            });
        }

    })



    .controller('QuizListCtrl', function($scope, $rootScope, $firebaseArray, $ionicModal) {


        $scope.quiz= [
            name='1',
            id=1
        ];


        var ref = new Firebase('https://schulschublade.firebaseio.com/quizzes/');
        $scope.quizzes = $firebaseArray(ref);


        $scope.deleteQuiz = function(id){
            console.log(id);
            var ret = $scope.quizzes.$remove($scope.quizzes.$getRecord(id));
            console.log(ret);
        }

        $scope.changeQuiz = function(id){
            // change a message and save it
            var item = $scope.pupils.$getRecord(id);
            item.first = "alanisawesome";
            $scope.pupils.$save(item).then(function() {
                // data has been saved to Firebase
                console.log("ok");
            });
        }

        $scope.questionlist = function(id){

            window.location='#/app/question-list/'+$scope.quizzes.$getRecord(id).$id;

        }


        //Add Modal

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/create-quiz.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modalAdd = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeAdd = function() {
            $scope.modalAdd.hide();
        };

        // Open the login modal
        $scope.createQuiz = function() {



            $scope.modalAdd.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doAdd = function() {
            console.log('Done save', $scope.loginData);

            $scope.quizzes.$add({
                name: $scope.quiz.name,
                id: $scope.quiz.id,
                qlist:["eins","zwei"]
            });

            $scope.closeAdd();


        };


        //Add Modal Ende


    })



    .controller('QuestionListCtrl', function($scope, $rootScope, $firebaseArray,  $ionicModal, $stateParams, $timeout) {

        $scope.quizno=$stateParams.quizno;
        console.log($stateParams.quizno);

        /*var showQuestions = function(){
            if ($scope.qlist!==null && $scope.allquestions!==null){

                var allQ = $scope.allquestions;
                var qList = $scope.qlist;
                console.log("Log showQuestions");
                console.log(allQ+"allQ");
                console.log($scope.allquestions+" scopeallQ");
                console.log(qList+"qList");
                console.log($scope.quizzes+"Log Quizzes");
                $scope.shownquestions = [];
                 angular.forEach(allQ, function(avalue, akey) {
                 //this.push(key + ': ' + value);
                 angular.forEach(qList, function(bvalue, bkey) {
                 //this.push(key + ': ' + value);
                 if (bvalue==akey) console.log(akey+"foreach");
                 });
                 });

            }
            else $scope.shownquestions=[];
        }*/



        var ref1 = new Firebase('https://schulschublade.firebaseio.com/quizzes/');
        $scope.quizzes = $firebaseArray(ref1);

       /* ref1.on("value", function(snapshot) {
            console.log(snapshot.val()+"snapshot-quizzes");

            console.log($scope.quizzes+"  quizzes");

            showQuestions();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });*/


        var ref = new Firebase('https://schulschublade.firebaseio.com/questions/');
        $scope.allquestions = $firebaseArray(ref);

        /*ref.on("value", function(snapshot) {
            console.log(snapshot.val()+"snapshot-allquestions");
            console.log("child_added to questions");

            console.log($scope.allquestions+"  allquestions");

            showQuestions();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });*/




        /*$scope.workquestions
        $scope.questions*/

        $timeout(function() {
            console.log($scope.quizzes+"  quizzes");
            console.log($scope.allquestions+"  allquestions");
            console.log($scope.allquestions[0].$id+"  allquestions-Eintrag");
            $scope.quiz = $scope.quizzes.$getRecord($scope.quizno);
            console.log($scope.quiz.$id+" quiz-id");
            console.log($scope.quiz.qlist+" quiz-q");

            $scope.shownquestions=[];


            for(var i=0;i<$scope.quiz.qlist.length;i++){
                console.log("Durchlauf"+i)
                for(var j=0;j<$scope.allquestions.length;j++){
                    if($scope.quiz.qlist[i]==$scope.allquestions[j].$id) {
                        console.log("yeah");
                        $scope.shownquestions.push($scope.allquestions[j]);
                    }
                }
            }

        }, 2000);



        /*var query = ref.orderByChild("timestamp").limitToLast(1);
        query.on("child_added", function(lastEntry) {
            // This will only be called for the last 100 messages
            //$scope.letztes = lastEntry.val();
            $scope.letztes = lastEntry.key();
            console.log(lastEntry.key());


            var quiz = $scope.quizzes.$getRecord($scope.quizno);
            console.log(quiz.qlist);
            quiz.qlist.push($scope.letztes);
            console.log(quiz.qlist);
            $scope.quizzes.$save(quiz).then(function() {
                // data has been saved to Firebase
                console.log("hinzugefügt");
            });

        });*/



        $scope.deleteQuestion = function(id){
            console.log(id+" Question-ID");
            var ret = $scope.questions.$remove($scope.questions.$getRecord(id));
            console.log(ret);
            location.reload();
        }

        $scope.showQuestion = function(id){
            // change a message and save it
            var item = $scope.questions.$getRecord(id);

        }

        $scope.addQuestion = function(id){

        }


        $scope.answerFalse=function(){
            $scope.question.a=false;
            console.log($scope.question.a+" AnswerFalse")
        }
        $scope.answerTrue=function(){
            $scope.question.a=true;
            console.log($scope.question.a+" AnswerTrue")
        }

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/createquestion.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.questionmodal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeCreateQuestion = function() {
            $scope.questionmodal.hide();
        };

        // Open the login modal
        $scope.createQuestion = function() {
            $scope.questionmodal.show();
        };

        var ref = new Firebase('https://schulschublade.firebaseio.com/questions/');
        $scope.questions = $firebaseArray(ref);

        var ref1 = new Firebase('https://schulschublade.firebaseio.com/quizzes/');
        $scope.quizzes = $firebaseArray(ref1);

        $scope.question= [
            q='1=1?',
            a=true
        ];

        var query = ref.orderByChild("timestamp").limitToLast(1);
        query.on("child_added", function(messageSnapshot) {
            // This will only be called for the last 100 messages
            $scope.letztes = messageSnapshot.val();
        });
        console.log(ref);
        console.log(query);
       //if (query !==null)$scope.letztes= query;

        // Perform the login action when the user submits the login form
        $scope.create = function() {


                // add a new record to the list
                console.log("Frage erstellen");
                $scope.questions.$add({
                    q: $scope.question.q,
                    a: $scope.question.a,
                    timestamp:Firebase.ServerValue.TIMESTAMP
                });


            var query = ref.orderByChild("timestamp").limitToLast(1);
            query.on("child_added", function(lastEntry) {
                // This will only be called for the last 100 messages
                //$scope.letztes = lastEntry.val();
                $scope.letztes = lastEntry.key();
                console.log(lastEntry.key());


                var quiz = $scope.quizzes.$getRecord($scope.quizno);
                console.log(quiz.qlist);
                quiz.qlist.push($scope.letztes);
                console.log(quiz.qlist);
                $scope.quizzes.$save(quiz).then(function() {
                    // data has been saved to Firebase
                    console.log("hinzugefügt");
                });

            });

            location.reload();


        };

    })


    .controller('PupilAccountCtrl', function($scope, $rootScope) {

    })



    .controller('TeacherCtrl', function($scope, $rootScope) {

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

