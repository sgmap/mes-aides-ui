'use strict';

angular.module('ddsApp').controller('FoyerConjointCtrl', function($scope, $state, SituationService) {
    var demandeur = SituationService.getDemandeur($scope.situation);
    var hasChildren = SituationService.hasEnfant($scope.situation);
    var famille = $scope.famille = $scope.situation.famille;

    var isFirstView = demandeur.statut_marital == undefined;
    $scope.locals = {
        isInCouple : isFirstView ? undefined : Boolean(SituationService.getConjoint($scope.situation)),
    };

    function isInCoupleUpdated() {
        if ($scope.locals.isInCouple == false) {
            demandeur.statut_marital = 2; // Célibataire et union libre
        } else {
            delete $scope.famille.rsa_isolement_recent;
        }
        if (isFirstView && (! $scope.locals.isInCouple) && (! captureRsaIsolementRecent())) {
            // on supprime l'éventuel conjoint qui existait avant
            $scope.situation.individus = _.filter($scope.situation.individus, function(individu) {
                return 'conjoint' !== individu.role;
            });
            $scope.submit();
        }
    }
    $scope.isInCoupleUpdated = isInCoupleUpdated;

    function captureRsaIsolementRecent() {
        return $scope.locals.isInCouple == false && hasChildren;
    }
    $scope.captureRsaIsolementRecent = captureRsaIsolementRecent;

    function rsaIsolementRecentUpdated() {
        if (! shouldDisplaySubmit()) {
            $scope.submit();
        }
    }
    $scope.rsaIsolementRecentUpdated = rsaIsolementRecentUpdated;

    function shouldDisplaySubmit() {
        return ($scope.locals.isInCouple == false) && (! hasChildren) && (! isFirstView);
    }
    $scope.shouldDisplaySubmit = shouldDisplaySubmit;

    function submit() {
        $state.go('foyer.logement');
    }
    $scope.submit = submit;
});
