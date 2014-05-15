/**
 * Created by keny on 2014/5/12.
 */
'use strict'

var app= angular.module('app',['ngGrid']);

//var mydata=[];

app.controller('AnchorCTRL',
  function AnchorCTRL($scope,$http){
      $scope.word1 = /[a-zA-Z]{1,}/;
      $scope.word2 = /[0-9a-zA-Z]{2,}/;
//      $scope.refloat =  /^[-+]?[0-9]*\.?[0-9]+$/;
//      $scope.re99num = /[0-9]{2,}/;
//      $scope.renum = /^(0|[1-9][0-9]*)$/;
      $scope.mAnchorList = [];
      $scope.mAnchor = [];
      $scope.showTable = false;

      $scope.$on('ngGridEventEndCellEdit', function (data) {
          //console.log(data);
          //console.log(data.currentScope);
         console.log(data.targetScope.row.entity);
          //alert("hi");
          //mydata= $scope.mAnchorList;
          //$("#content").innerHTML = $scope.mAnchorList;
          //document.getElementById("mycontent").innerHTML = JSON.stringify($scope.mAnchorList);


      });

      $scope.gridOptions = {
          data: 'mAnchorList',
          enableCellSelection: true,
          enableRowSelection: false,
//          enableCellEdit: true,
//          canSelectRows: false,
          displaySelectionCheckbox: false,
          columnDefs: [
              {field: 'sn', displayName: '編號',enableCellEdit: false},
              {field: 'free', displayName: '自由段', cellTemplate:'<div class="ngCellText colt{{$index}}"><input type="number" style="text-align: center;width: 100px"  data-ng-model="COL_FIELD"  min="0"/></div>'},
              //{field: 'free', displayName: '自由段', enableCellEdit: true},
              {field: 'header', displayName: '錨碇段', cellTemplate:'<div class="ngCellText colt{{$index}}"><input type="number" style="text-align: center;width: 100px"  data-ng-model="COL_FIELD"  min="0"/></div>'},
              {field: 'weight', displayName: '設計荷重', cellTemplate:'<div class="ngCellText colt{{$index}}"><input type="number" style="text-align: center;width: 100px"  data-ng-model="COL_FIELD"  min="0"/></div>'},
              {field: '',displayName: '刪除', cellTemplate: '<input type="button" value="刪除" ng-click="removeRow()" />' }

              ]
      };


      $scope.AddAnchorList = function(){

          if(!$scope.area){
              alert("區為英文字母（由A 開始），採1碼表示");
              return false;
          }
          if(!$scope.level){
              alert("階為數字（由 1 開始），採1碼表示");
              return false;
          }
          if(!$scope.row){
              alert("排為數字或字母（10, 20, …,90,A0,B0,..），採2碼表示");
              return false;
          }
          if(!$scope.num){
              alert("支為數字，採2碼表示");
              return false;
          }

          //($scope);

          $scope.showTable = true;

          var tempAnchor =
          {
              sn:$scope.area.toUpperCase()+$scope.level+$scope.row,
              area:$scope.area.toUpperCase(),
              level:$scope.level,
              row:$scope.row.toUpperCase(),
              num:$scope.num
          }

          for(var i=0;i<$scope.mAnchor.length;i++){
              if($scope.mAnchor[i].sn==tempAnchor.sn){
                  $scope.mAnchor.splice(i,1);
                  $scope.mAnchorList =$scope.mAnchorList.filter(function(entry){
                      if(entry.area==tempAnchor.area&&
                          entry.level==tempAnchor.level&&
                          entry.row==tempAnchor.row
                          ){
                          return false;
                      }else{
                          return true;
                      }
                  });


              }
          }

          $scope.mAnchor.push({
              sn:$scope.area.toUpperCase()+$scope.level+$scope.row.toUpperCase(),
              area:$scope.area.toUpperCase(),
              level:$scope.level,
              row:$scope.row.toUpperCase(),
              num:$scope.num
          });
          for(var i=0;i<$scope.num;i++){
              if(i<9){
                  $scope.mAnchorList.push({
                      free:$scope.free,
                      header:$scope.header,
                      weight:$scope.weight,
                      area:$scope.area.toUpperCase(),
                      level:$scope.level,
                      row:$scope.row.toUpperCase(),
                      num:i+1,
                      sn:""+$scope.area.toUpperCase()+$scope.level+$scope.row.toUpperCase()+"0"+(i+1)
                  });

              }else{
                  $scope.mAnchorList.push({
                      free:$scope.free,
                      header:$scope.header,
                      weight:$scope.weight,
                      area:$scope.area.toUpperCase(),
                      level:$scope.level,
                      row:$scope.row.toUpperCase(),
                      num:i+1,
                      sn:""+$scope.area.toUpperCase()+$scope.level+$scope.row.toUpperCase()+(i+1)
                  });
              }

          }

          //mydata= $scope.mAnchorList;
          //$("#content").innerHTML = $scope.mAnchorList;

          //document.getElementById("mycontent").innerHTML = JSON.stringify($scope.mAnchorList);
          console($scope.mAnchorList.length);

          var gridHeight = $scope.mAnchorList.length>0?$scope.mAnchorList.length * 35:50;
          $scope.mystyle={height:gridHeight+'px'};

      }


      $scope.removeRow = function() {
          var index = this.row.rowIndex;
          //alert(index);
          $scope.gridOptions.selectItem(index, false);
          $scope.mAnchorList.splice(index, 1);
          //document.getElementById("mycontent").innerHTML = JSON.stringify($scope.mAnchorList);
          var gridHeight = $scope.mAnchorList.length>0?$scope.mAnchorList.length * 35:50;
          $scope.mystyle={height:gridHeight+'px'};
      };


      $scope.numberValid = function($value,index){
          console.log(free+" "+result);
          var result = true;
          if ($value) {
            //  result = $scope.mAnchorList[index]["free"] >= $value;
          }

          return result;
      };






  }
);


