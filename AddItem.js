//AddItem 5E
/*Example command
!AddItem {"itemcount": "1", "itemname": "Dagger","itemweight": "3","itemproperties": "Finesse, Light, Range, Thrown", "itemmodifiers": "Item Type: Melee Weapon, Damage: 1d10, Damage Type: Bludgeoning, Range: 20/60", "hasattack": "1"}
*/

var generateUUID = (function() {
    "use strict";

    var a = 0, b = [];
    return function() {
        var c = (new Date()).getTime() + 0, d = c === a;
        a = c;
        for (var e = new Array(8), f = 7; 0 <= f; f--) {
            e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64);
            c = Math.floor(c / 64);
        }
        c = e.join("");
        if (d) {
            for (f = 11; 0 <= f && 63 === b[f]; f--) {
                b[f] = 0;
            }
            b[f]++;
        } else {
            for (f = 0; 12 > f; f++) {
                b[f] = Math.floor(64 * Math.random());
            }
        }
        for (f = 0; 12 > f; f++){
            c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        }
        return c;
    };
}()),

generateRowID = function () {
    "use strict";
    return generateUUID().replace(/_/g, "Z");
};

var getattr = function getattr(cid, att) {
  var attr = findObjs({
    type: 'attribute',
    characterid: cid,
    name: att
  })[0];
  if (attr) {
    return attr.get('current');
  }
  return '';
};

var addItem = function addItem(reps, itemObj)
{
    
    log(itemObj);

    const repString = `repeating_inventory_${generateRowID()}`;
        
    const data = {};
    Object.keys(itemObj).forEach(field => {
        data[`${repString}_${field}`] = itemObj[field];
    });
    setAttrs(reps, data);
}

var addCoin = function addCoin(reps, val, cointype) {
    if (!reps) {return;}
    switch(cointype) {
      case "cp":
        itemObj = {
            cp: (Number(getattr(reps, "cp")) + Number(val))
        }
        break;
      case "sp":
        itemObj = {
            sp: (Number(getattr(reps, "sp")) + Number(val))
        }
        break;
      case "ep":
        itemObj = {
            ep: (Number(getattr(reps, "ep")) + Number(val))
        }
        break;
      case "gp":
        itemObj = {
            gp: (Number(getattr(reps, "gp")) + Number(val))
        }
        break;
      case "pp":
        itemObj = {
            pp: (Number(getattr(reps, "pp")) + Number(val))
        }
        break;
      default:
        return;
    }
    
    const data = {};
    Object.keys(itemObj).forEach(field => {
        data[`${field}`] = itemObj[field];
    });
    setAttrs(reps, data);
}

on("ready", function() {

    on("chat:message", function (msg) {
        if (msg.type === "api" && msg.content.startsWith("!AddItem"))  {
            var reps;
            try {
              reps = getObj(msg.selected[0]._type,msg.selected[0]._id).get('represents');
            }
            catch(err) {
              sendChat("AddItem", "/w " + msg.who + " Please select a token to add the items to.");
              return;
            }
            if (!reps) {return;}
            addItem(reps, msg.content.substring(9));
        }
        else if (msg.type === "api" && msg.content.startsWith("!AddCoin"))  {
            var reps;
            try {
              reps = getObj(msg.selected[0]._type,msg.selected[0]._id).get('represents');
            }
            catch(err) {
              sendChat("AddItem", "/w " + msg.who + " Please select a token to add the items to.");
              return;
            }
            if (!reps) {return;}
            let vals = msg.content.split(" ");
            addCoin(reps, vals[1], vals[2]);
        }
    });
});