
//Takes in an array of options and returns one randomly.
function select_random(choices) {
  return choices[RandomInt(choices.length)-1]
}

function RandomInt(m) {
    var max = m;
    var min = 1 ;
    var d = max - min + 1; // distribution range
    return Math.floor(Math.random() * d + min);
}

//Chooses a set of armor based of of utility, which is AC (-1 for stealth disadvantage)
//Generally, the higher an armor's AC, the less likely it is to be chosen
function choose_armor(type) {
      armor_value_total = 0
      armor_result = []
      for(amt_armors = armor.length; amt_armors > 0; amt_armors--, armor_value_total = armor_value_total + armor_value) {
          if(type == 'mithral' && armor[Math.floor(amt_armors - 1)][2] == 'light') {armor_value = 0}
          else if(type == 'mithral' && armor[Math.floor(amt_armors - 1)][0] == 'hide') {armor_value = 0}
          else {armor_value = armor[Math.floor(amt_armors - 1)][1]}
      }
      //sendChat(msg.who, "/w gm Armor value total is " + armor_value_total) /* DEBUG */
      for(amt_armors = armor.length, armor_low = 1; amt_armors > 0; amt_armors--) {
          //armor_name = armor[Math.floor(amt_armors - 1)][0]
          if(type == 'mithral' && armor[Math.floor(amt_armors - 1)][2] == 'light') {}
          else if(type == 'mithral' && armor[Math.floor(amt_armors - 1)][0] == 'hide') {}
          else {armor[Math.floor(amt_armors - 1)][3] = armor_low
          armor_high = armor_low + Math.floor(armor_value_total / armor[Math.floor(amt_armors - 1)][1])
          armor[Math.floor(amt_armors - 1)][4] = armor_high
          armor_low = armor_high + 1
          }
          //sendChat(msg.who, "/w gm " + armor_name + " armor low has been set to " + armor[Math.floor(amt_armors - 1)][3] + " and high has been set to " + armor[Math.floor(amt_armors - 1)][4]) /* DEBUG */
      }
      armor_roll = RandomInt(armor_high)
      //sendChat(msg.who, "/w gm Armor roll is [[" + armor_roll + "]] (d" + armor_high + ")") /* DEBUG */
      for(amt_armors = armor.length; amt_armors > 0; amt_armors--) {
          if(type == 'mithral' && armor[Math.floor(amt_armors - 1)][2] == 'light') {}
          else if(type == 'mithral' && armor[Math.floor(amt_armors - 1)][0] == 'hide') {}
          else if(armor_roll >= armor[Math.floor(amt_armors - 1)][3] && armor_roll <= armor[Math.floor(amt_armors - 1)][4]) {
              armor_result = armor[Math.floor(amt_armors - 1)]
           }
      }
      return armor_result
}

function choose_weapon(type) {
      weapon_utility_total = 0
      weapon_result = 0
      for(amt_weapons = weapons.length; amt_weapons > 0; amt_weapons--, weapon_utility_total = weapon_utility_total + weapon_utility) {
          
          if(type == 'sword' && weapons[Math.floor(amt_weapons - 1)][3] != 'sword') {weapon_utility = 0}
          
          else if(type == 'axe' && weapons[Math.floor(amt_weapons - 1)][3] != 'axe') {weapon_utility = 0}
          
          else if(type == 'slashing' && weapons[Math.floor(amt_weapons - 1)][2] != 'slashing') {weapon_utility = 0}
          
          else{weapon_utility = weapons[Math.floor(amt_weapons - 1)][1]}
      }
      for(amt_weapons = weapons.length, weapon_low = 1; amt_weapons > 0; amt_weapons--) {
          
          if(type == 'sword' && weapons[Math.floor(amt_weapons - 1)][3] != 'sword') {}
          
          else if(type == 'axe' && weapons[Math.floor(amt_weapons - 1)][3] != 'axe') {}
          
          else if(type == 'slashing' && weapons[Math.floor(amt_weapons - 1)][2] != 'slashing') {}
          
          else {weapons[Math.floor(amt_weapons - 1)][4] = weapon_low
          weapon_high = weapon_low + Math.floor(weapon_utility_total / weapons[Math.floor(amt_weapons - 1)][1])
          weapons[Math.floor(amt_weapons - 1)][5] = weapon_high
          weapon_low = weapon_high + 1
          }
      }
      weapon_roll = RandomInt(weapon_high)
      for(amt_weapons = weapons.length; amt_weapons > 0; amt_weapons--) {
          
          if(type == 'sword' && weapons[Math.floor(amt_weapons - 1)][3] != 'sword') {}
          
          else if(type == 'axe' && weapons[Math.floor(amt_weapons - 1)][3] != 'axe') {}
          
          else if(type == 'slashing' && weapons[Math.floor(amt_weapons - 1)][2] != 'slashing') {}
          
          else if(weapon_roll >= weapons[Math.floor(amt_weapons - 1)][4] && weapon_roll <= weapons[Math.floor(amt_weapons - 1)][5]) {
              weapon_result = weapons[Math.floor(amt_weapons - 1)]
           }
      }
      return weapon_result
}

function resistance_type() {
      resistance_roll = RandomInt(10)
      resistance_result = 0
      if(resistance_roll == 1) {resistance_result = 'acid'}
      if(resistance_roll == 2) {resistance_result = 'cold'}
      if(resistance_roll == 3) {resistance_result = 'fire'}
      if(resistance_roll == 4) {resistance_result = 'force'}
      if(resistance_roll == 5) {resistance_result = 'lightning'}
      if(resistance_roll == 6) {resistance_result = 'necrotic'}
      if(resistance_roll == 7) {resistance_result = 'poison'}
      if(resistance_roll == 8) {resistance_result = 'psychic'}
      if(resistance_roll == 9) {resistance_result = 'radiant'}
      if(resistance_roll == 10) {resistance_result = 'thunder'}
      return resistance_result
}

function scroll_spell(lvl) {
  spell_name = 0
  if(lvl != 'cantrip') {lvl_roll = RandomInt(lvl) - 1}
  if(lvl == 'cantrip') {
      spell_name = cantrips[Math.floor(Math.random() * cantrips.length)]
  }
  else {spell_name = spells[lvl_roll][Math.floor(Math.random() * spells[lvl_roll].length)]}
  return spell_name
} 

on("chat:message", function(msg) {
  var loot = ""

  //set Teasure Hoard Challenge Level with !mtt [level]
  if(msg.type == "api" && msg.content.indexOf("!mtt ") !== -1) {
      treasure_table_level = msg.content.replace("!mtt ", "")
     
      //Roll the d100 that determines amount of gems, art and magic items
      treasure_hoard_d100 = RandomInt(100)
      //Roll result only goes to the GM
      // sendChat(msg.who, "/w gm You roll " + treasure_hoard_d100 + " (d100).")
      sendChat(msg.who, "/w gm Started Treasure generation")
      
      //Define some variables
      treasure_hoard_variables = [
          
          treasure_hoard_cp = 0,
          treasure_hoard_sp = 0,
          treasure_hoard_ep = 0,
          treasure_hoard_gp = 0,
          treasure_hoard_pp = 0,
          
          gems = [
              amt_10_gp_gems = 0,
              amt_50_gp_gems = 0,
              amt_100_gp_gems = 0,
              amt_500_gp_gems = 0,
              amt_1000_gp_gems = 0,
              amt_5000_gp_gems = 0 
          ],
          art = [
              amt_25_gp_art = 0,
              amt_250_gp_art = 0,
              amt_750_gp_art = 0,
              amt_2500_gp_art = 0,
              amt_7500_gp_art = 0
          ],
          mit = [
              amt_mit_a = 0,
              amt_mit_b = 0,
              amt_mit_c = 0,
              amt_mit_d = 0,
              amt_mit_e = 0,
              amt_mit_f = 0,
              amt_mit_g = 0,
              amt_mit_h = 0,
              amt_mit_i = 0
          ],
          cantrips = [
              'Acid Splash',
              'Blade Ward',
              'Chill Touch',
              'Dancing Lights',
              'Druidcraft',
              'Eldritch Blast',
              'Fire Bolt',
              'Friends',
              'Guidance',
              'Light',
              'Mage Hand',
              'Mending',
              'Message',
              'Minor Illusion',
              'Poison Spray',
              'Prestidigitation',
              'Produce Flame',
              'Ray of Frost',
              'Resistance',
              'Sacred Flame',
              'Shillelagh',
              'Shocking Grasp',
              'Spare the Dying',
              'Thaumaturgy',
              'Thorn Whip',
              'True Strike',
              'Vicious Mockery'
          ],
          spells = [
              spells_1 = [
                  'Alarm',
                  'Animal Friendship',
                  'Armor of Agathys',
                  'Arms of Hadar',
                  'Bane',
                  'Bless',
                  'Burning Hands',
                  'Charm Person',
                  'Chromatic Orb',
                  'Color Spray',
                  'Command',
                  'Compelled Duel',
                  'Comprehend Languages',
                  'Create or Destroy Water',
                  'Cure Wounds',
                  'Detect Evil and Good',
                  'Detect Magic',
                  'Detect Poison and Disease',
                  'Disguise Self',
                  'Dissonant Whispers',
                  'Divine Favor',
                  'Ensnaring Strike',
                  'Entangle',
                  'Expeditious Retreat',
                  'Faerie Fire',
                  'False Life',
                  'Feather Fall',
                  'Find Familiar',
                  'Fog Cloud',
                  'Goodberry',
                  'Grease',
                  'Guiding Bolt',
                  'Hail of Thorns',
                  'Healing Word',
                  'Hellish Rebuke',
                  'Heroism',
                  'Hex',
                  'Hunters Mark',
                  'Identify',
                  'Illusory Script',
                  'Inflict Wounds',
                  'Jump',
                  'Longstrider',
                  'Mage Armor',
                  'Magic Missile',
                  'Protection from Evil and Good',
                  'Purify Food and Drink',
                  'Ray of Sickness',
                  'Sanctuary',
                  'Searing Flame',
                  'Shield',
                  'Shield of Faith',
                  'Silent Image',
                  'Sleep',
                  'Speak with Animals',
                  'Tashas Hideous Laughter',
                  'Tensers Floating Orb',
                  'Thunderous Smite',
                  'Thunderwave',
                  'Unseen Servant',
                  'Witch Bolt',
                  'Wrathful Smite'
              ],
              spells_2 = [
                  'Aid',
                  'Alter Self',
                  'Animal Messenger',
                  'Arcane Lock',
                  'Barkskin',
                  'Beast Sense',
                  'Blindness/Deafness',
                  'Blur',
                  'Branding Smite',
                  'Calm Emotions',
                  'Cloud of Daggers',
                  'Continual Flame',
                  'Cordon of Arrows',
                  'Crown of Madness',
                  'Darkness',
                  'Darkvision',
                  'Detect Thoughts',
                  'Enhance Ability',
                  'Enlarge/Reduce',
                  'Enthrall',
                  'Find Steed',
                  'Find Traps',
                  'Flame Blade',
                  'Flaming Sphere',
                  'Gentle Repose',
                  'Gust of Wind',
                  'Heat Metal',
                  'Hold Person',
                  'Invisibility',
                  'Knock',
                  'Lesser Restoration',
                  'Levitate',
                  'Locate Animals or Plants',
                  'Locate Object',
                  'Magic Mouth',
                  'Magic Weapon',
                  'Melfs Acid Arrow',
                  'Mirror Image',
                  'Misty Step',
                  'Moonbeam',
                  'Nystuls Magic Aura',
                  'Pass Without Trace',
                  'Phantasmal Force',
                  'Prayer of Healing',
                  'Protection from Poison',
                  'Ray of Enfeeblement',
                  'Rope Trick',
                  'Scorching Ray',
                  'See Invisibility',
                  'Shatter',
                  'Silence',
                  'Spider Climb',
                  'Spike Growth',
                  'Spiritual Weapon',
                  'Suggestion',
                  'Warding Bond',
                  'Web',
                  'Zone of Truth',
              ],
              spells_3 = [
                  'Animate Dead',
                  'Aura of Vitality',
                  'Beacon of Hope',
                  'Bestow Curse',
                  'Blinding Smite',
                  'Blink',
                  'Call Lightning',
                  'Clairvoyance',
                  'Conjure Animals',
                  'Conjura Barrage',
                  'Counterspell',
                  'Create Food and Water',
                  'Crusaders Mantle',
                  'Daylight',
                  'Dispel Magic',
                  'Elemental Weapon',
                  'Fear',
                  'Feign Death',
                  'Fireball',
                  'Fly',
                  'Gaseous Form',
                  'Glyph of Warding',
                  'Haste',
                  'Hunger of Hadar',
                  'Hypnotic Pattern',
                  'Leomunds Tiny Hut',
                  'Lightning Arrow',
                  'Lightning Bolt',
                  'Magic Circle',
                  'Major Image',
                  'Mass Healing Ward',
                  'Meld Into Stone',
                  'Nondetection',
                  'Phantom Steed',
                  'Plant Growth',
                  'Protection from Energy',
                  'Remove Curse',
                  'Revivify',
                  'Sending',
                  'Sleet Storm',
                  'Slow',
                  'Speak with Dead',
                  'Speak with Plants',
                  'Spirit Guardians',
                  'Stinking Cloud',
                  'Tongues',
                  'Vampiric Touch',
                  'Water Breathing',
                  'Water Walk',
                  'Wind Wall',
              ],
              spells_4 = [
                  'Arcane Eye',
                  'Aura of Life',
                  'Aura of Purity',
                  'Banishment',
                  'Blight',
                  'Compulsion',
                  'Confusion',
                  'Conjure Minor Elementals',
                  'Conjure Woodland Beings',
                  'Control Water',
                  'Death Ward',
                  'Dimension Door',
                  'Divination',
                  'Dominate Beast',
                  'Evards Black Tentacles',
                  'Fabricate',
                  'Fire Shield',
                  'Freedom of Movement',
                  'Giant Insect',
                  'Grasping Vines',
                  'Greater Invisibility',
                  'Guardians of Faith',
                  'Hallucinatory Terrain',
                  'Ice Storm',
                  'Leomunds Secret Chest',
                  'Locate Creature',
                  'Mordenkainens Faithful Hound',
                  'Mordenkainens Private Sanctum',
                  'Otilukes Resilient Sphere',
                  'Phantasmal Killer',
                  'Polymorph',
                  'Staggering Smite',
                  'Stone Shape',
                  'Stoneskin',
                  'Wall of Fire',
              ],
              spells_5 = [
                  'Animate Objects',
                  'Antilife Shell',
                  'Awaken',
                  'Banishing Smite',
                  'Bigbys Hand',
                  'Circle of Power',
                  'Cloudkill',
                  'Commune',
                  'Commune with Nature',
                  'Cone of Cold',
                  'Conjure Elemental',
                  'Conjure Volley',
                  'Contact Other Plane',
                  'Contagion',
                  'Creation',
                  'Destructive Smite',
                  'Dispel Evil and Good',
                  'Dominate Person',
                  'Dream',
                  'Flame Strike',
                  'Geas',
                  'Greater Restoration',
                  'Hallow',
                  'Hold Monster',
                  'Insect Plague',
                  'Legend Lore',
                  'Mass Cure Wounds',
                  'Mislead',
                  'Modify Memory',
                  'Passwall',
                  'Planar Binding',
                  'Raise Dead',
                  'Rarys Telepathic Bond',
                  'Reincarnate',
                  'Scrying',
                  'Seeming',
                  'Swift Quiver',
                  'Telekinesis',
                  'Teleportation Circle',
                  'Tree Stride',
                  'Wall of Force',
                  'Wall of Stone',
              ],
          ],
          ammo = [
              'arrow',
              'blowgun needle',
              'crossbow bolt',
              'sling bullet',
          ],
          armor = [
              //For each, ['name', utility, 'type', weight]
              //Utility is AC
              armor_padded = ['padded', 11, 'light', 8],
              armor_leather = ['leather', 11, 'light', 10],
              armor_studded_leather = ['studded leather', 12, 'light', 13],
              armor_hide = ['hide', 12, 'medium', 12],
              armor_chain_shirt = ['chain shirt', 13, 'medium', 20],
              armor_scale_mail = ['scale mail', 14, 'medium', 45],
              armor_breastplate = ['breastplate', 14, 'medium', 20],
              armor_half_plate = ['half plate', 15, 'medium', 40],
              armor_ring_mail = ['ring mail', 14, 'heavy', 40],
              armor_chain_mail = ['chain mail', 16, 'heavy', 55],
              armor_splint = ['splint', 17, 'heavy', 60],
              armor_plate = ['plate', 18, 'heavy', 65],
          ],
          weapons = [
              //For each, ['name', utility, 'damage type', 'weapon type', 'damage', 'weight', 'properties', 'modifiers']
              //Utility is calculated by the following:
              //max damage + min damage
              //+ 1 each for reach, finesse, versatile, thrown, light
              //- 1 each for heavy, two-handed, loading0
              weapon_club = ['club', 6, 'bludgeoning', 'club', '1d4', '2', 'Light', 'Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning'],
              weapon_dagger = ['dagger', 8, 'piercing', 'dagger', '1d4', '1', 'Finesse, light, thrown (range 20/60)', 'Item Type: Melee Weapon, Damage: 1d4, Damage Type: Piercing, Range: 20/60'],
              weapon_greatclub = ['greatclub', 8, 'bludgeoning', 'club', '1d8', '10', 'Two-handed', 'Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning'],
              weapon_handaxe = ['handaxe', 9, 'slashing', 'axe', '1d6', '2', 'Light, thrown (range 20/60)', 'Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing, Range: 20/60'],
              weapon_javelin = ['javelin', 8, 'piercing', 'javelin', '1d6', '2', 'Thrown (range 30/120)', 'Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120'],
              weapon_light_hammer = ['light hammer', 7, 'bludgeoning', 'hammer', '1d4', '2', 'Light, thrown (range 20/60)', 'Item Type: Melee Weapon, Damage: 1d4, Damage Type: bludgeoning, Range: 20/60'],
              weapon_mace = ['mace', 7, 'bludgeoning', 'mace', '1d6', '4', '', 'Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning'],
              weapon_quarterstaff = ['quarterstaff', 8, 'bludgeoning', 'staff', '1d6', '4', 'Versatile (1d8)', 'Item Type: Melee Weapon, Damage: 1d6, Damage Type: bludgeoning'],
              weapon_sickle = ['sickle', 6, 'slashing', 'sickle', '1d4', '2', 'Light', 'Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing'],
              weapon_spear = ['spear', 9, 'piercing', 'spear', '1d6', '3', 'Thrown (range 20/60), versatile (1d8)', 'Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 20/60'],
              weapon_crossbow_light = ['light crossbow', 7, 'piercing', 'crossbow', '1d8', '5', 'Ammunition (range 80/320), loading, two-handed', 'Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Range: 80/320'],
              weapon_dart = ['dart', 7, 'piercing', 'dart', '1d4', '0.25', 'Finesse, thrown (range 20/60)', 'Item Type: Ranged Weapon, Damage: 1d4, Damage Type: piercing, Range: 20/60'],
              weapon_shortbow = ['shortbow', 6, 'piercing', 'bow', '1d6', '2', 'Ammunition (range 80/320), two-handed', 'Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Range: 80/320'],
              weapon_sling = ['sling', 5, 'bludgeoning', 'sling', '1d4', '0', 'Ammunition (range 30/120)', 'Item Type: Ranged Weapon, Damage: 1d8, Damage Type: bludgeoning, Range: 30/120'],
              weapon_battleaxe = ['battleaxe', 10, 'slashing', 'axe', '1d8', '4', 'Versatile (1d10)', 'Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing'],
              weapon_flail = ['flail', 9, 'bludgeoning', 'flail', '1d8', '2', '', 'Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning'],
              weapon_glaive = ['glaive', 10, 'slashing', 'polearm', '1d10', '6', 'Heavy, reach, two-handed', 'Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing'],
              weapon_greataxe = ['greataxe', 11, 'slashing', 'axe', '1d12', '7', 'Heavy, two-handed', 'Item Type: Melee Weapon, Damage: 1d12, Damage Type: slashing'],
              weapon_greatsword = ['greatsword', 12, 'slashing', 'sword', '2d6', '6', 'Heavy, two-handed', 'Item Type: Melee Weapon, Damage: 2d6, Damage Type: slashing'],
              weapon_halberd = ['halberd', 10, 'slashing', 'polearm', '1d10', '6', 'Heavy, reach, two-handed', 'Item Type: Melee Weapon, Damage: 1d10, Damage Type: slashing'],
              weapon_lance = ['lance', 10, 'piercing', 'lance', '1d12', '6', 'Reach, special', 'Item Type: Melee Weapon, Damage: 1d12, Damage Type: piercing'],
              weapon_longsword = ['longsword', 10, 'slashing', 'sword', '1d8', '3', 'Versatile (1d10)', 'Item Type: Melee Weapon, Damage: 1d8, Damage Type: slashing'],
              weapon_maul = ['maul', 12, 'bludgeoning', 'maul', '2d6', '10', 'Heavy, two-handed', 'Item Type: Melee Weapon, Damage: 2d6, Damage Type: bludgeoning'],
              weapon_morningstar = ['morningstar', 10, 'piercing', 'morningstar', '1d8', '4', '', 'Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing'],
              weapon_pike = ['pike', 10, 'piercing', 'polearm', '1d10', '18', 'Heavy, reach, two-handed', 'Item Type: Melee Weapon, Damage: 1d10, Damage Type: piercing'],
              weapon_rapier = ['rapier', 10, 'piercing', 'sword', '1d8', '2', 'Finesse', 'Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing'],
              weapon_scimitar = ['scimitar', 9, 'slashing', 'sword', '1d6', '3', 'Finesse, light', 'Item Type: Melee Weapon, Damage: 1d6, Damage Type: slashing'],
              weapon_shortsword = ['shortsword', 9, 'piercing', 'sword', '1d6', '2', 'Finesse, light', 'Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing'],
              weapon_trident = ['trident', 9, 'piercing', 'trident', '1d6', '4', 'Thrown (range 20/60), versatile (1d8)', 'Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 20/60'],
              weapon_war_pick = ['war pick', 9, 'piercing', 'war pick', '1d8', '2', '', 'Item Type: Melee Weapon, Damage: 1d8, Damage Type: piercing'],
              weapon_warhammer = ['warhammer', 10, 'bludgeoning', 'hammer', '1d8', '2', 'Versatile (1d10)', 'Item Type: Melee Weapon, Damage: 1d8, Damage Type: bludgeoning'],
              weapon_whip = ['whip', 7, 'slashing', 'whip', '1d4', '3', 'Finesse, reach', 'Item Type: Melee Weapon, Damage: 1d4, Damage Type: slashing'],
              weapon_blowgun = ['blowgun', 3, 'piercing', 'blowgun', '1', '1', 'Ammunition (range 25/100), loading', 'Item Type: Ranged Weapon, Damage: 1, Damage Type: piercing, Range: 25/100'],
              weapon_crossbow_hand = ['hand crossbow', 8, 'piercing', 'crossbow', '1d6', '3', 'Ammunition (range 30/120), light, loading', 'Item Type: Ranged Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120'],
              weapon_crossbow_heavy = ['heavy crossbow', 8, 'piercing', 'crossbow', '1d10', '18', 'Ammunition (range 100/400), heavy, loading, two-handed', 'Item Type: Ranged Weapon, Damage: 1d10, Damage Type: piercing, Range: 100/400'],
              weapon_longbow = ['longbow', 8, 'piercing', 'bow', '1d8', '2', 'Ammunition (range 150/600), heavy, two-handed', 'Item Type: Ranged Weapon, Damage: 1d8, Damage Type: piercing, Range: 150/600'],
          ],
      ]
      
      //Return error if level is < 0
      if(treasure_table_level < 0) {
          //sendChat(msg.who, "/w gm ERROR: The value must be a positive integer")
          treasure_table_level = 0
          return;
      }
    
      //Roll from Treasure Hoard: Challenge 0-4
      if(treasure_table_level < 5) {
          //sendChat(msg.who, "/w gm Rolling from Treasure Hoard: Challenge 0-4")
      
          //calculte currency reward from Treasure Hoard: Challenge 0-4
          treasure_hoard_cp = Math.floor((RandomInt(6) + RandomInt(6) + RandomInt(6) + RandomInt(6) + RandomInt(6) + RandomInt(6)) * 100)
          treasure_hoard_sp = Math.floor((RandomInt(6) + RandomInt(6) + RandomInt(6)) * 100)
          treasure_hoard_gp = Math.floor((RandomInt(6) + RandomInt(6)) * 10)
      
          //determine gems, art objects and magic item rewards based off of the d100 roll
          if(treasure_hoard_d100 < 7) {}
          else if(treasure_hoard_d100 < 17) {amt_10_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))}
          else if(treasure_hoard_d100 < 27) {amt_25_gp_art = Math.floor(RandomInt(4) + RandomInt(4))}
          else if(treasure_hoard_d100 < 37) {amt_50_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))}
          else if(treasure_hoard_d100 < 45) {
              amt_10_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))
              amt_mit_a = RandomInt(6)}
          else if(treasure_hoard_d100 < 53) {
              amt_25_gp_art = Math.floor(RandomInt(4) + RandomInt(4))
              amt_mit_a = RandomInt(6)}
          else if(treasure_hoard_d100 < 61) {
              amt_50_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))
              amt_mit_a = RandomInt(6)}
          else if(treasure_hoard_d100 < 66) {
              amt_10_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))
              amt_mit_b = RandomInt(4)}
          else if(treasure_hoard_d100 < 71) {
              amt_25_gp_art = Math.floor(RandomInt(4) + RandomInt(4))
              amt_mit_b = RandomInt(4)}
          else if(treasure_hoard_d100 < 76) {
              amt_50_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))
              amt_mit_b = RandomInt(4)}
          else if(treasure_hoard_d100 < 79) {
              amt_10_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))
              amt_mit_c = RandomInt(4)}
          else if(treasure_hoard_d100 < 81) {
              amt_25_gp_art = Math.floor(RandomInt(4) + RandomInt(4))
              amt_mit_c = RandomInt(4)}
          else if(treasure_hoard_d100 < 86) {
              amt_50_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))
              amt_mit_c = RandomInt(4)}
          else if(treasure_hoard_d100 < 93) {
              amt_25_gp_art = Math.floor(RandomInt(4) + RandomInt(4))
              amt_mit_f = RandomInt(4)}
          else if(treasure_hoard_d100 < 98) {
              amt_50_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))
              amt_mit_f = RandomInt(4)}
          else if(treasure_hoard_d100 < 100) {
              amt_25_gp_art = Math.floor(RandomInt(4) + RandomInt(4))
              amt_mit_g = 1}
          else if(treasure_hoard_d100 == 100) {
              amt_50_gp_gems = Math.floor(RandomInt(6) + RandomInt(6))
              amt_mit_g = 1}
      }
      
      //Roll from Treasure Hoard: Challenge 5-10
      else if(treasure_table_level < 11) {
          //sendChat(msg.who, "/w gm Rolling from Treasure Hoard: Challenge 5-10")
          
          //calculte currency reward from Treasure Hoard: Challenge 5-10
          treasure_hoard_cp = Math.floor((RandomInt(6) + RandomInt(6)) * 100)
          treasure_hoard_sp = Math.floor((RandomInt(6) + RandomInt(6)) * 1000)
          treasure_hoard_gp = Math.floor((RandomInt(6) + RandomInt(6) + RandomInt(6)  
                                        + RandomInt(6) + RandomInt(6) + RandomInt(6)) * 100)
          treasure_hoard_pp = Math.floor((RandomInt(6) + RandomInt(6) + RandomInt(6)) * 10)
          
          if(treasure_hoard_d100 < 5) {}
          else if(treasure_hoard_d100 < 11) {amt_25_gp_art = Math.floor(RandomInt(4) + RandomInt(4))}
      }

     //Determine type and amount of gemstones, then print to chat
      //10 gp Gemstones
      if(amt_10_gp_gems > 0) {
          //sendChat(msg.who, "/w gm " + amt_10_gp_gems + " beautiful gemstone(s).")
          gems_azurite = 0; gems_banded_agate = 0; gems_blue_quartz = 0; gems_eye_agate = 0
          gems_hematite = 0; gems_lapis_lazuli = 0; gems_malachite = 0; gems_moss_agate = 0
          gems_obsidian = 0; gems_rhodochrosite = 0; gems_tiger_eye = 0; gems_turquoise = 0  
          for(gems_type = RandomInt(12); amt_10_gp_gems > 0; amt_10_gp_gems--, gems_type = RandomInt(12)) {
              if(gems_type == 1) {gems_azurite++} else if(gems_type == 2) {gems_banded_agate++}
              else if(gems_type == 3) {gems_blue_quartz++} else if(gems_type == 4) {gems_eye_agate++}
              else if(gems_type == 5) {gems_hematite++} else if(gems_type == 6) {gems_lapis_lazuli++}
              else if(gems_type == 7) {gems_malachite++} else if(gems_type == 8) {gems_moss_agate++}
              else if(gems_type == 9) {gems_obsidian++} else if(gems_type == 10) {gems_rhodochrosite++}
              else if(gems_type == 11) {gems_tiger_eye++} else if(gems_type == 12) {gems_turquoise++}
          } 
          //Display results in chat
          if(gems_azurite > 0) {loot = loot + "{\"itemcount\": \"" + gems_azurite + "\", \"itemname\": \"azurite gemstone\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_banded_agate > 0) {loot = loot + "{\"itemcount\": \"" + gems_banded_agate + "\", \"itemname\": \"banded agate gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_blue_quartz > 0) {loot = loot + "{\"itemcount\": \"" + gems_blue_quartz + "\", \"itemname\": \"blue quartz gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_eye_agate > 0) {loot = loot + "{\"itemcount\": \"" + gems_eye_agate + "\", \"itemname\": \"eye agate gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_hematite > 0) {loot = loot + "{\"itemcount\": \"" + gems_hematite + "\", \"itemname\": \"hematite gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_lapis_lazuli > 0) {loot = loot + "{\"itemcount\": \"" + gems_lapis_lazuli + "\", \"itemname\": \"lapis lazuli gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_malachite > 0) {loot = loot + "{\"itemcount\": \"" + gems_malachite + "\", \"itemname\": \"malachite gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_moss_agate > 0) {loot = loot + "{\"itemcount\": \"" + gems_moss_agate + "\", \"itemname\": \"moss agate gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_obsidian > 0) {loot = loot + "{\"itemcount\": \"" + gems_obsidian + "\", \"itemname\": \"obsidian gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_rhodochrosite > 0) {loot = loot + "{\"itemcount\": \"" + gems_rhodochrosite + "\", \"itemname\": \"rhodochrosite gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_tiger_eye > 0) {loot = loot + "{\"itemcount\": \"" + gems_tiger_eye + "\", \"itemname\": \"tiger eye gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
          if(gems_turquoise > 0) {loot = loot + "{\"itemcount\": \"" + gems_turquoise + "\", \"itemname\": \"turquoise gemstone(s)\", \"itemcontent\": \"(10 gp each)\"};"}
      }
      
      //50 gp Gemstones
      if(amt_50_gp_gems > 0) {
          // sendChat(msg.who, "/w gm " + amt_50_gp_gems + " beautiful gemstone(s).")
          gems_bloodstone = 0; gems_carnelian = 0; gems_chalcedony = 0; gems_chrysoprase = 0
          gems_citrine = 0; gems_jasper = 0; gems_moonstone = 0; gems_onyx = 0
          gems_quartz = 0; gems_sardonyx = 0; gems_star_rose_quartz = 0; gems_zircon = 0
          for(gems_type = RandomInt(12); amt_50_gp_gems > 0; amt_50_gp_gems--, gems_type = RandomInt(12)) {
              if(gems_type == 1) {gems_bloodstone++} else if(gems_type == 2) {gems_carnelian++}
              else if(gems_type == 3) {gems_chalcedony++} else if(gems_type == 4) {gems_chrysoprase++}
              else if(gems_type == 5) {gems_citrine++} else if(gems_type == 6) {gems_jasper++}
              else if(gems_type == 7) {gems_moonstone++} else if(gems_type == 8) {gems_onyx++}
              else if(gems_type == 9) {gems_quartz++} else if(gems_type == 10) {gems_sardonyx++}
              else if(gems_type == 11) {gems_star_rose_quartz++} else if(gems_type == 12) {gems_zircon++}
          } 
          //Display results in chat
          if(gems_bloodstone > 0) {loot = loot + "{\"itemcount\": \"" + gems_bloodstone + "\", \"itemname\": \" bloodstone gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_carnelian > 0) {loot = loot + "{\"itemcount\": \"" + gems_carnelian + "\", \"itemname\": \" carnelian gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_chalcedony > 0) {loot = loot + "{\"itemcount\": \"" + gems_chalcedony + "\", \"itemname\": \" chalcedony gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_chrysoprase > 0) {loot = loot + "{\"itemcount\": \"" + gems_chrysoprase + "\", \"itemname\": \" chrysoprase gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_citrine > 0) {loot = loot + "{\"itemcount\": \"" + gems_citrine + "\", \"itemname\": \" citrine gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_jasper > 0) {loot = loot + "{\"itemcount\": \"" + gems_jasper + "\", \"itemname\": \" jasper gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_moonstone > 0) {loot = loot + "{\"itemcount\": \"" + gems_moonstone + "\", \"itemname\": \" moonstone gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_onyx > 0) {loot = loot + "{\"itemcount\": \"" + gems_onyx + "\", \"itemname\": \" onyx gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_quartz > 0) {loot = loot + "{\"itemcount\": \"" + gems_quartz + "\", \"itemname\": \" quartz gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_sardonyx > 0) {loot = loot + "{\"itemcount\": \"" + gems_sardonyx + "\", \"itemname\": \" sardonyx gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_star_rose_quartz > 0) {loot = loot + "{\"itemcount\": \"" + gems_star_rose_quartz + "\", \"itemname\": \" star rose quartz gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
          if(gems_zircon > 0) {loot = loot + "{\"itemcount\": \"" + gems_zircon + "\", \"itemname\": \" zircon gemstone(s)\", \"itemcontent\": \"(50 gp each)\"};"}
      }

      //100 gp Gemstones
      if(amt_100_gp_gems > 0) {
          gems_amber = 0; gems_amethyst = 0; gems_chrysoberyl = 0; gems_coral = 0
          gems_garnet = 0; gems_jade = 0; gems_jet = 0; gems_pearl = 0
          gems_spinel = 0; gems_tourmaline = 0
          for(gems_type = RandomInt(10); amt_100_gp_gems > 0; amt_100_gp_gems--, gems_type = RandomInt(10)) {
              if(gems_type == 1) {gems_amber++} else if(gems_type == 2) {gems_amethyst++}
              else if(gems_type == 3) {gems_chrysoberyl++} else if(gems_type == 4) {gems_coral++}
              else if(gems_type == 5) {gems_garnet++} else if(gems_type == 6) {gems_jade++}
              else if(gems_type == 7) {gems_jet++} else if(gems_type == 8) {gems_pearl++}
              else if(gems_type == 9) {gems_spinel++} else if(gems_type == 10) {gems_tourmaline++}
          } 
          //Display results in chat
          if(gems_amber > 0) {loot = loot + "{\"itemcount\": \"" + gems_amber + "\", \"itemname\": \" Amber (" + select_random(['transparent watery gold', 'rich gold']) + ")\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_amethyst > 0) {loot = loot + "{\"itemcount\": \"" + gems_amethyst + "\", \"itemname\": \" Amethyst (transparent deep purple)\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_chrysoberyl > 0) {loot = loot + "{\"itemcount\": \"" + gems_chrysoberyl + "\", \"itemname\": \" Chrysoberyl (" + select_random(['transparent yellow-green', 'pale green']) + ")\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_coral > 0) {loot = loot + "{\"itemcount\": \"" + gems_coral + "\", \"itemname\": \" Coral (opaque crimson)\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_garnet > 0) {loot = loot + "{\"itemcount\": \"" + gems_garnet + "\", \"itemname\": \" Garnet (" + select_random(['transparent red', 'brown-green', 'violet']) + ")\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_jade > 0) {loot = loot + "{\"itemcount\": \"" + gems_jade + "\", \"itemname\": \" jade (" + select_random(['translucent light green', 'deep green' , 'white']) + ")\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_jet > 0) {loot = loot + "{\"itemcount\": \"" + gems_jet + "\", \"itemname\": \" Jet (opaque deep black)\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_pearl > 0) {loot = loot + "{\"itemcount\": \"" + gems_pearl + "\", \"itemname\": \" Pearl (" + select_random(['opaque lustrous white' , 'yellow', 'pink']) + ")\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_spinel > 0) {loot = loot + "{\"itemcount\": \"" + gems_spinel + "\", \"itemname\": \" Spinel (" + select_random(['transparent red', 'red-brown',  'deep green']) + ")\", \"itemcontent\": \"(100 gp each)\"};"}
          if(gems_tourmaline > 0) {loot = loot + "{\"itemcount\": \"" + gems_tourmaline + "\", \"itemname\": \" Tourmaline (" + select_random(['transparent pale green' , 'blue', 'brown' , 'red']) + ")\", \"itemcontent\": \"(100 gp each)\"};"}
      }

      //500 gp Gemstones
      if(amt_500_gp_gems > 0) {
          gems_alexandrite = 0; gems_aquamarine = 0; gems_black_pearl = 0; gems_blue_spinel = 0
          gems_peridot = 0; gems_topaz = 0
          for(gems_type = RandomInt(6); amt_500_gp_gems > 0; amt_500_gp_gems--, gems_type = RandomInt(6)) {
              if(gems_type == 1) {gems_alexandrite++} else if(gems_type == 2) {gems_aquamarine++}
              else if(gems_type == 3) {gems_black_pearl++} else if(gems_type == 4) {gems_blue_spinel++}
              else if(gems_type == 5) {gems_peridot++} else if(gems_type == 6) {gems_topaz++}
          } 
          //Display results in chat
          if(gems_alexandrite > 0) {loot = loot + "{\"itemcount\": \"" + gems_alexandrite + "\", \"itemname\": \"Alexandrite (transparent dark green)\", \"itemcontent\": \"(500 gp each)\"};"}
          if(gems_aquamarine > 0) {loot = loot + "{\"itemcount\": \"" + gems_aquamarine + "\", \"itemname\": \"Aquamarine (transparent pale blue-green)\", \"itemcontent\": \"(500 gp each)\"};"}
          if(gems_black_pearl > 0) {loot = loot + "{\"itemcount\": \"" + gems_black_pearl + "\", \"itemname\": \"Black pearl (opaque pure black)\", \"itemcontent\": \"(500 gp each)\"};"}
          if(gems_blue_spinel > 0) {loot = loot + "{\"itemcount\": \"" + gems_blue_spinel + "\", \"itemname\": \"Blue spinel (transparent deep blue)\", \"itemcontent\": \"(500 gp each)\"};"}
          if(gems_peridot > 0) {loot = loot + "{\"itemcount\": \"" + gems_peridot + "\", \"itemname\": \"Peridot (transparent rich olive green))\", \"itemcontent\": \"(500 gp each)\"};"}
          if(gems_topaz > 0) {loot = loot + "{\"itemcount\": \"" + gems_topaz + "\", \"itemname\": \"Topaz (transparent golden yellow)\", \"itemcontent\": \"(500 gp each)\"};"}
      }

      //1000 gp Gemstones
      if(amt_1000_gp_gems > 0) {
          gems_black_opal = 0; gems_blue_sapphire = 0; gems_emerald = 0; gems_fire_opal = 0
          gems_opal = 0; gems_star_ruby = 0; gems_star_sapphire = 0; gems_yellow_sapphire = 0
          for(gems_type = RandomInt(8); amt_1000_gp_gems > 0; amt_1000_gp_gems--, gems_type = RandomInt(8)) {
              if(gems_type == 1) {gems_black_opal++} else if(gems_type == 2) {gems_blue_sapphire++}
              else if(gems_type == 3) {gems_emerald++} else if(gems_type == 4) {gems_fire_opal++}
              else if(gems_type == 5) {gems_opal++} else if(gems_type == 6) {gems_star_ruby++}
              else if(gems_type == 7) {gems_star_sapphire++} else if(gems_type == 8) {gems_yellow_sapphire++}
          } 
          //Display results in chat
          if(gems_black_opal > 0) {loot = loot + "{\"itemcount\": \"" + gems_black_opal + "\", \"itemname\": \"Black opal (translucent dark green with black mottling and golden flecks)\", \"itemcontent\": \"(1000 gp each)\"};"}
          if(gems_blue_sapphire > 0) {loot = loot + "{\"itemcount\": \"" + gems_blue_sapphire + "\", \"itemname\": \"Blue sapphire (" + select_random(['transparent blue-white' , 'medium blue']) + ")\", \"itemcontent\": \"(1000 gp each)\"};"}
          if(gems_emerald > 0) {loot = loot + "{\"itemcount\": \"" + gems_emerald + "\", \"itemname\": \"Emerald (transparent deep bright green)\", \"itemcontent\": \"(1000 gp each)\"};"}
          if(gems_fire_opal > 0) {loot = loot + "{\"itemcount\": \"" + gems_fire_opal + "\", \"itemname\": \"Fire opal (translucent fiery red)\", \"itemcontent\": \"(1000 gp each)\"};"}
          if(gems_opal > 0) {loot = loot + "{\"itemcount\": \"" + gems_opal + "\", \"itemname\": \"Opal (translucent pale blue with green and golden mottling)\", \"itemcontent\": \"(1000 gp each)\"};"}
          if(gems_star_ruby > 0) {loot = loot + "{\"itemcount\": \"" + gems_star_ruby + "\", \"itemname\": \"Star ruby (translucent ruby with white star-shaped center)\", \"itemcontent\": \"(1000 gp each)\"};"}
          if(gems_star_sapphire > 0) {loot = loot + "{\"itemcount\": \"" + gems_star_sapphire + "\", \"itemname\": \"Star sapphire (translucent blue sapphire with white star-shaped center)\", \"itemcontent\": \"(1000 gp each)\"};"}
          if(gems_yellow_sapphire > 0) {loot = loot + "{\"itemcount\": \"" + gems_yellow_sapphire + "\", \"itemname\": \"Yellow sapphire (" + select_random(['transparent fiery yellow' , 'yellow·green']) + ")\", \"itemcontent\": \"(1000 gp each)\"};"}
      }

      //5000 gp Gemstones
      if(amt_5000_gp_gems > 0) {
          gems_black_sapphire = 0; gems_diamond = 0; gems_jacinth = 0; gems_ruby = 0
          for(gems_type = RandomInt(8); amt_5000_gp_gems > 0; amt_5000_gp_gems--, gems_type = RandomInt(8)) {
              if(gems_type == 1) {gems_black_sapphire++} else if(gems_type == 2) {gems_diamond++}
              else if(gems_type == 3) {gems_jacinth++} else if(gems_type == 4) {gems_ruby++}
          } 
          //Display results in chat
          if(gems_black_sapphire > 0) {loot = loot + "{\"itemcount\": \"" + gems_black_sapphire + "\", \"itemname\": \"Black sapphire (translucent lustrous black with glowing highlights)\", \"itemcontent\": \"(5000 gp each)\"};"}
          if(gems_diamond > 0) {loot = loot + "{\"itemcount\": \"" + gems_diamond + "\", \"itemname\": \"Diamond (" + select_random(['transparent blue-white' , 'canary', 'pink', 'brown', 'blue']) + ")\", \"itemcontent\": \"(5000 gp each)\"};"}
          if(gems_jacinth > 0) {loot = loot + "{\"itemcount\": \"" + gems_jacinth + "\", \"itemname\": \"jacinth (transparent fiery orange)\", \"itemcontent\": \"(5000 gp each)\"};"}
          if(gems_ruby > 0) {loot = loot + "{\"itemcount\": \"" + gems_ruby + "\", \"itemname\": \"Ruby (" + select_random(['transparent clear red' , 'deep crimson']) + ")\", \"itemcontent\": \"(5000 gp each)\"};"}
      }
      
     //Determine type and amount of art objects, then print to chat
      //25 gp art objects
      if(amt_25_gp_art > 0) {
          art_silver_ewer = 0
          art_bone_statuette = 0
          art_small_gold_bracelet = 0
          art_cloth_of_gold_vestments = 0
          art_black_velvet_mask = 0
          art_copper_chalice = 0
          art_bone_dice = 0
          art_small_mirror = 0
          art_silk_handkerchief = 0
          art_gold_locket = 0
          for(art_type = RandomInt(10); amt_25_gp_art > 0; amt_25_gp_art--, art_type = RandomInt(10)) {
              if(art_type == 1) {art_silver_ewer++} else if(art_type == 2) {art_bone_statuette++}
              else if(art_type == 3) {art_small_gold_bracelet++} else if(art_type == 4) {art_cloth_of_gold_vestments++}
              else if(art_type == 5) {art_black_velvet_mask++} else if(art_type == 6) {art_copper_chalice++}
              else if(art_type == 7) {art_bone_dice++} else if(art_type == 8) {art_small_mirror++}
              else if(art_type == 9) {art_silk_handkerchief++} else if(art_type == 10) {art_gold_locket++}
          } 
          //Display results in chat
          if(art_silver_ewer > 0) {loot = loot + "{\"itemcount\": \"" + art_silver_ewer + "\", \"itemname\": \"silver ewer(s)\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_bone_statuette > 0) {loot = loot + "{\"itemcount\": \"" + art_bone_statuette + "\", \"itemname\": \"carved bone statuette(s)\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_small_gold_bracelet > 0) {loot = loot + "{\"itemcount\": \"" + art_small_gold_bracelet + "\", \"itemname\": \"small gold bracelet(s)\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_cloth_of_gold_vestments > 0) {loot = loot + "{\"itemcount\": \"" + art_cloth_of_gold_vestments + "\", \"itemname\": \"cloth-of-gold vestment(s)\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_black_velvet_mask > 0) {loot = loot + "{\"itemcount\": \"" + art_black_velvet_mask + "\", \"itemname\": \"black velvet mask(s) stitched with a silver thread\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_copper_chalice > 0) {loot = loot + "{\"itemcount\": \"" + art_copper_chalice + "\", \"itemname\": \"copper chalice(s) with a silver figure\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_bone_dice > 0) {loot = loot + "{\"itemcount\": \"" + art_bone_dice + "\", \"itemname\": \"pair(s) of engraved bone dice\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_small_mirror > 0) {loot = loot + "{\"itemcount\": \"" + art_small_mirror + "\", \"itemname\": \"small mirror(s) set in a painted wood frame\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_silk_handkerchief > 0) {loot = loot + "{\"itemcount\": \"" + art_silk_handkerchief + "\", \"itemname\": \"embroidered silk handkerchief(s)\", \"itemcontent\": \"(25 gp each)\"};"}
          if(art_gold_locket > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_locket + "\", \"itemname\": \"gold locket(s) with a painted portrait inside\", \"itemcontent\": \"(25 gp each)\"};"}
      }

      //250 gp art objects
      if(amt_250_gp_art > 0) {
          art_gold_ring = 0
          art_ivory_statuette = 0
          art_large_gold_bracelet = 0
          art_silver_necklace = 0
          art_bronze_crown = 0
          art_silk_robe = 0
          art_large_tapestry = 0
          art_brass_mug = 0
          art_animal_figurines = 0
          art_gold_cage = 0
          for(art_type = RandomInt(10); amt_250_gp_art > 0; amt_250_gp_art--, art_type = RandomInt(10)) {
              if(art_type == 1) {art_gold_ring++} else if(art_type == 2) {art_ivory_statuette++}
              else if(art_type == 3) {art_large_gold_bracelet++} else if(art_type == 4) {art_silver_necklace++}
              else if(art_type == 5) {art_bronze_crown++} else if(art_type == 6) {art_silk_robe++}
              else if(art_type == 7) {art_large_tapestry++} else if(art_type == 8) {art_brass_mug++}
              else if(art_type == 9) {art_animal_figurines++} else if(art_type == 10) {art_gold_cage++}
          } 
          //Display results in chat
          if(art_gold_ring > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_ring + "\", \"itemname\": \"Gold ring(s) set with bloodstones\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_ivory_statuette > 0) {loot = loot + "{\"itemcount\": \"" + art_ivory_statuette + "\", \"itemname\": \"Carved ivory statuette(s)\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_large_gold_bracelet > 0) {loot = loot + "{\"itemcount\": \"" + art_large_gold_bracelet + "\", \"itemname\": \"Large gold bracelet(s)\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_silver_necklace > 0) {loot = loot + "{\"itemcount\": \"" + art_silver_necklace + "\", \"itemname\": \"Silver necklace with a gemstone pendant(s)\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_bronze_crown > 0) {loot = loot + "{\"itemcount\": \"" + art_bronze_crown + "\", \"itemname\": \"Bronze crown(s)\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_silk_robe > 0) {loot = loot + "{\"itemcount\": \"" + art_silk_robe + "\", \"itemname\": \"Silk robe(s) with gold embroidery\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_large_tapestry > 0) {loot = loot + "{\"itemcount\": \"" + art_large_tapestry + "\", \"itemname\": \"Large well-made tapestry\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_brass_mug > 0) {loot = loot + "{\"itemcount\": \"" + art_brass_mug + "\", \"itemname\": \"Brass mug with jade inlay\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_animal_figurines > 0) {loot = loot + "{\"itemcount\": \"" + art_animal_figurines + "\", \"itemname\": \"Box(es) of turquoise animal figurines\", \"itemcontent\": \"(250 gp each)\"};"}
          if(art_gold_cage > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_cage + "\", \"itemname\": \"Gold bird cage(s) with electrum filigree\", \"itemcontent\": \"(250 gp each)\"};"}
      }

      //750 gp art objects
      if(amt_750_gp_art > 0) {
          art_silver_chalice = 0
          art_silver_sword = 0
          art_carved_harps = 0
          art_gold_idol = 0
          art_gold_comb = 0
          art_bottle_stopper = 0
          art_ceremonial_dagger = 0
          art_silver_brooch = 0
          art_obsidian_statuette = 0
          art_gold_mask = 0
          for(art_type = RandomInt(10); amt_750_gp_art > 0; amt_750_gp_art--, art_type = RandomInt(10)) {
              if(art_type == 1) {art_silver_chalice++} else if(art_type == 2) {art_silver_sword++}
              else if(art_type == 3) {art_carved_harps++} else if(art_type == 4) {art_gold_idol++}
              else if(art_type == 5) {art_gold_comb++} else if(art_type == 6) {art_bottle_stopper++}
              else if(art_type == 7) {art_ceremonial_dagger++} else if(art_type == 8) {art_silver_brooch++}
              else if(art_type == 9) {art_obsidian_statuette++} else if(art_type == 10) {art_gold_mask++}
          } 
          //Display results in chat
          if(art_silver_chalice > 0) {loot = loot + "{\"itemcount\": \"" + art_silver_chalice + "\", \"itemname\": \"Silver chalice(s) set with moonstones\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_silver_sword > 0) {loot = loot + "{\"itemcount\": \"" + art_silver_sword + "\", \"itemname\": \"Silver-plated steel longsword(s) with jet set in hilt\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_carved_harps > 0) {loot = loot + "{\"itemcount\": \"" + art_carved_harps + "\", \"itemname\": \"Carved harp(s) of exotic wood with ivory inlay and zircon gems\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_gold_idol > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_idol + "\", \"itemname\": \"Small gold idol(s)\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_gold_comb > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_comb + "\", \"itemname\": \"Gold dragon comb(s) set with red garnets as eyes\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_bottle_stopper > 0) {loot = loot + "{\"itemcount\": \"" + art_bottle_stopper + "\", \"itemname\": \"Bottle stopper cork(s) embossed with gold leaf and set with amethysts\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_ceremonial_dagger > 0) {loot = loot + "{\"itemcount\": \"" + art_ceremonial_dagger + "\", \"itemname\": \"Ceremonial electrum dagger with a black pearl in the pommel\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_silver_brooch > 0) {loot = loot + "{\"itemcount\": \"" + art_silver_brooch + "\", \"itemname\": \"Silver and gold brooch\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_obsidian_statuette > 0) {loot = loot + "{\"itemcount\": \"" + art_obsidian_statuette + "\", \"itemname\": \"Obsidian statuette(s) with gold fittings and inlay\", \"itemcontent\": \"(750 gp each)\"};"}
          if(art_gold_mask > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_mask + "\", \"itemname\": \"Painted gold war mask(s)\", \"itemcontent\": \"(750 gp each)\"};"}
      }

      //2500 gp art objects
      if(amt_2500_gp_art > 0) {
          art_gold_chain = 0
          art_old_painting = 0
          art_silk_mantle = 0
          art_platinum_bracelet = 0
          art_glove_set = 0
          art_jeweled_anklet = 0
          art_gold_box = 0
          art_gold_circlet = 0
          art_eye_patch = 0
          art_string_pearls = 0
          for(art_type = RandomInt(10); amt_2500_gp_art > 0; amt_2500_gp_art--, art_type = RandomInt(10)) {
              if(art_type == 1) {art_gold_chain++} else if(art_type == 2) {art_old_painting++}
              else if(art_type == 3) {art_silk_mantle++} else if(art_type == 4) {art_platinum_bracelet++}
              else if(art_type == 5) {art_glove_set++} else if(art_type == 6) {art_jeweled_anklet++}
              else if(art_type == 7) {art_gold_box++} else if(art_type == 8) {art_gold_circlet++}
              else if(art_type == 9) {art_eye_patch++} else if(art_type == 10) {art_string_pearls++}
          } 
          //Display results in chat
          if(art_gold_chain > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_chain + "\", \"itemname\": \"Fine gold chain(s) set with a fire opal\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_old_painting > 0) {loot = loot + "{\"itemcount\": \"" + art_old_painting + "\", \"itemname\": \"Old masterpiece painting(s)\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_silk_mantle > 0) {loot = loot + "{\"itemcount\": \"" + art_silk_mantle + "\", \"itemname\": \"Embroidered silk and velvet mantle(s) set with numerous moonstones\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_platinum_bracelet > 0) {loot = loot + "{\"itemcount\": \"" + art_platinum_bracelet + "\", \"itemname\": \"Platinum bracelet(s) set with a sapphire\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_glove_set > 0) {loot = loot + "{\"itemcount\": \"" + art_glove_set + "\", \"itemname\": \"Embroidered glove set(s) with jewel chips\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_jeweled_anklet > 0) {loot = loot + "{\"itemcount\": \"" + art_jeweled_anklet + "\", \"itemname\": \"jeweled anklet(s)\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_gold_box > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_box + "\", \"itemname\": \"Gold music box(es)\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_gold_circlet > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_circlet + "\", \"itemname\": \"Gold circlet set(s) with four aquamarines\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_eye_patch > 0) {loot = loot + "{\"itemcount\": \"" + art_eye_patch + "\", \"itemname\": \"Eye patch with a mock eye set in blue sapphire and moonstone\", \"itemcontent\": \"(2500 gp each)\"};"}
          if(art_string_pearls > 0) {loot = loot + "{\"itemcount\": \"" + art_string_pearls + "\", \"itemname\": \"A necklace string of small pink pearls\", \"itemcontent\": \"(2500 gp each)\"};"}
      }

      //7500 gp art objects
      if(amt_7500_gp_art > 0) {
          art_gold_crown = 0
          art_platinum_ring = 0
          art_gold_statuette = 0
          art_gold_cups = 0
          art_jewelery_box = 0
          art_gold_sarcophagus = 0
          art_jade_board = 0
          art_ivory_horn = 0
          for(art_type = RandomInt(10); amt_7500_gp_art > 0; amt_7500_gp_art--, art_type = RandomInt(10)) {
              if(art_type == 1) {art_gold_crown++} else if(art_type == 2) {art_platinum_ring++}
              else if(art_type == 3) {art_gold_statuette++} else if(art_type == 4) {art_gold_cups++}
              else if(art_type == 5) {art_jewelery_box++} else if(art_type == 6) {art_gold_sarcophagus++}
              else if(art_type == 7) {art_jade_board++} else if(art_type == 8) {art_ivory_horn++}
          } 
          //Display results in chat
          if(art_gold_crown > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_crown + "\", \"itemname\": \"Jeweled gold crown\", \"itemcontent\": \"(7500 gp each)\"};"}
          if(art_platinum_ring > 0) {loot = loot + "{\"itemcount\": \"" + art_platinum_ring + "\", \"itemname\": \"jeweled platinum ring\", \"itemcontent\": \"(7500 gp each)\"};"}
          if(art_gold_statuette > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_statuette + "\", \"itemname\": \"Small gold statuette set with rubies\", \"itemcontent\": \"(7500 gp each)\"};"}
          if(art_gold_cups > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_cups + "\", \"itemname\": \"Gold cup set with emeralds\", \"itemcontent\": \"(7500 gp each)\"};"}
          if(art_jewelery_box > 0) {loot = loot + "{\"itemcount\": \"" + art_jewelery_box + "\", \"itemname\": \"Gold jewelry box with platinum filigree\", \"itemcontent\": \"(7500 gp each)\"};"}
          if(art_gold_sarcophagus > 0) {loot = loot + "{\"itemcount\": \"" + art_gold_sarcophagus + "\", \"itemname\": \"Painted gold child's sarcophagus\", \"itemcontent\": \"(7500 gp each)\"};"}
          if(art_jade_board > 0) {loot = loot + "{\"itemcount\": \"" + art_jade_board + "\", \"itemname\": \"jade game board with solid gold playing pieces\", \"itemcontent\": \"(7500 gp each)\"};"}
          if(art_ivory_horn > 0) {loot = loot + "{\"itemcount\": \"" + art_ivory_horn + "\", \"itemname\": \"Bejeweled ivory drinking horn with gold filigree\", \"itemcontent\": \"(7500 gp each)\"};"}
      }
      
     //Determine magic items, then whisper to GM
      //Magic Item Table A
      if(amt_mit_a > 0) {
          
          // sendChat(msg.who, "/w gm " + amt_mit_a + " magical items (table A)")
          
          amt_pot_healing = 0
          amt_ss_can = 0
          amt_pot_climbing = 0
          amt_ss_1 = 0
          amt_ss_2 = 0
          amt_pot_greater_healing = 0
          amt_bag_of_holding = 0
          amt_driftglobe = 0
          
          for (mit_d100 = RandomInt(100); amt_mit_a > 0; amt_mit_a--, mit_d100 = RandomInt(100)) {
              // sendChat(msg.who, "/w gm Rolled a " + mit_d100)
              if(mit_d100 < 51) {amt_pot_healing++}
              else if(mit_d100 < 61) {amt_ss_can++}
              else if(mit_d100 < 71) {amt_pot_climbing++}
              else if(mit_d100 < 91) {amt_ss_1++}
              else if(mit_d100 < 95) {amt_ss_2++}
              else if(mit_d100 < 99) {amt_pot_greater_healing++}
              else if(mit_d100 == 99) {amt_bag_of_holding++}
              else if(mit_d100 == 100) {amt_driftglobe++}
          } 
          //Display results in chat
          
          if(amt_pot_healing > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_healing + "\", \"itemname\": \"potion(s) of healing\"};"}
          for (;amt_ss_can > 0; amt_ss_can--) {loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"" + "Spell scroll of " + scroll_spell('cantrip') + " (cantrip)\"};"}
          if(amt_pot_climbing > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_climbing + "\", \"itemname\": \"potion(s) of climbing\"};"}
          for (;amt_ss_1 > 0; amt_ss_1--) {loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"" + "Spell scroll of " + scroll_spell(1) + " (lvl 1)\"};"}
          for (;amt_ss_2 > 0; amt_ss_2--) {loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"" + "Spell scroll of " + scroll_spell(2) + " (lvl 2)\"};"}
          if(amt_pot_greater_healing > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_greater_healing + "\", \"itemname\": \"potion(s) of greater healing\"};"}
          if(amt_bag_of_holding > 0) {loot = loot + "{\"itemcount\": \"" + amt_bag_of_holding + "\", \"itemname\": \"bag(s) of holding\"};"}
          if(amt_driftglobe > 0) {loot = loot + "{\"itemcount\": \"" + amt_driftglobe + "\", \"itemname\": \"driftglobe(s)\"};"}
      }
      
      //Magic Item Table B
      if(amt_mit_b > 0) {
          
          // sendChat(msg.who, "/w gm " + amt_mit_b + " magical items (table B)")
          
          
              /* 01-15 */ amt_pot_greater_healing = 0
              /* 16-22 */ amt_pot_fire_breath = 0
              /* 23-29 */ amt_pot_resistance = 0
              /* 30-34 */ amt_ammo_1 = 0
              /* 35-39 */ amt_pot_animal_friendship = 0
              /* 40-44 */ amt_pot_hill_giant_str = 0
              /* 45-49 */ amt_pot_growth = 0
              /* 50-54 */ amt_pot_water_breathing = 0
              /* 55-59 */ amt_ss_2 = 0
              /* 60-64 */ amt_ss_3 = 0
              /* 65-67 */ amt_bag_of_holding = 0
              /* 68-70 */ amt_keoghtoms_ointment = 0
              /* 71-73 */ amt_oil_slipperiness = 0
              /* 74-75 */ amt_dust_disappearance = 0
              /* 76-77 */ amt_dust_dryness = 0
              /* 78-79 */ amt_dust_sneezing_choking = 0
              /* 80-81 */ amt_elemental_gem = 0
              /* 82-83 */ amt_philter_love = 0
              /* 84 */ amt_alchemy_jug = 0
              /* 85 */ amt_cap_water_breathing = 0
              /* 86 */ amt_cloak_manta_ray = 0
              /* 87 */ amt_driftglobe = 0
              /* 88 */ amt_goggles_night = 0
              /* 89 */ amt_helm_comprehending_languages = 0
              /* 90 */ amt_immovable_rod = 0
              /* 91 */ amt_lantern_revealing = 0
              /* 92 */ amt_mariners_armor = 0
              /* 93 */ amt_mithral_armor = 0
              /* 94 */ amt_potion_poison = 0
              /* 95 */ amt_ring_swimming = 0
              /* 96 */ amt_robe_useful_items = 0
              /* 97 */ amt_rope_climbing = 0
              /* 98 */ amt_saddle_cavalier = 0
              /* 99 */ amt_wand_magic_detection = 0
              /* 100 */ amt_wand_secrets = 0
          
          for(mit_d100 = RandomInt(100); amt_mit_b > 0; amt_mit_b--, mit_d100 = RandomInt(100)) {
              // sendChat(msg.who, "/w gm Rolled a " + mit_d100)
              if(mit_d100 < 16) {amt_pot_greater_healing++}
              else if(mit_d100 < 23) {amt_pot_fire_breath++}
              else if(mit_d100 < 30) {amt_pot_resistance++}
              else if(mit_d100 < 35) {amt_ammo_1++}
              else if(mit_d100 < 40) {amt_pot_animal_friendship++}
              else if(mit_d100 < 45) {amt_pot_hill_giant_str++}
              else if(mit_d100 < 50) {amt_pot_growth++}
              else if(mit_d100 < 55) {amt_pot_water_breathing++}
              else if(mit_d100 < 60) {amt_ss_2++}
              else if(mit_d100 < 65) {amt_ss_3++}
              else if(mit_d100 < 68) {amt_bag_of_holding++}
              else if(mit_d100 < 71) {amt_keoghtoms_ointment++}
              else if(mit_d100 < 74) {amt_oil_slipperiness++}
              else if(mit_d100 < 76) {amt_dust_disappearance++}
              else if(mit_d100 < 78) {amt_dust_dryness++}
              else if(mit_d100 < 80) {amt_dust_sneezing_choking++}
              else if(mit_d100 < 82) {amt_elemental_gem++}
              else if(mit_d100 < 84) {amt_philter_love++}
              else if(mit_d100 == 84) {amt_alchemy_jug++}
              else if(mit_d100 == 85) {amt_cap_water_breathing++}
              else if(mit_d100 == 86) {amt_cloak_manta_ray++}
              else if(mit_d100 == 87) {amt_driftglobe++}
              else if(mit_d100 == 88) {amt_goggles_night++}
              else if(mit_d100 == 89) {amt_helm_comprehending_languages++}
              else if(mit_d100 == 90) {amt_immovable_rod++}
              else if(mit_d100 == 91) {amt_lantern_revealing++}
              else if(mit_d100 == 92) {amt_mariners_armor++}
              else if(mit_d100 == 93) {amt_mithral_armor++}
              else if(mit_d100 == 94) {amt_potion_poison++}
              else if(mit_d100 == 95) {amt_ring_swimming++}
              else if(mit_d100 == 96) {amt_robe_useful_items++}
              else if(mit_d100 == 97) {amt_rope_climbing++}
              else if(mit_d100 == 98) {amt_saddle_cavalier++}
              else if(mit_d100 == 99) {amt_wand_magic_detection++}
              else if(mit_d100 == 100) {amt_wand_secrets++}
          } 
          
          //Display results in chat
          
          if(amt_pot_greater_healing > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_greater_healing + "\", \"itemname\": \"potion(s) of greater healing\", \"itemweight\": \"0.5\", \"itemcontent\": \"You regain 4d4 + 4 Hit Points when you drink this potion. The potion's red liquid glimmers when agitated.\"};"}
          if(amt_pot_fire_breath > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_fire_breath + "\", \"itemname\": \"potion(s) of fire breath\", \"itemweight\": \"0.5\", \"itemcontent\": \"After drinking this potion, you can use a bonus action to exhale fire at a target within 30 feet of you. The target must make a DC 13 Dexterity saving throw, taking 4d6 fire damage on a failed save, or half as much damage on a successful one. The effect ends after you exhale the fire three times or when 1 hour has passed. This potion's orange liquid flickers, and smoke fills the top of the container and wafts out whenever it is opened.\"};"}
          if(amt_pot_resistance > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_resistance + "\", \"itemname\": \"potion(s) of " + select_random(['acid', 'cold', 'fire', 'force', 'lightning', 'necrotic', 'poison', 'psychic', 'radiant', 'thunder']) + " resistance\"}, \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, you gain resistance to the specified type of damage for 1 hour.\";"}
          for(;amt_ammo_1 > 0; amt_ammo_1--) {
              ammo_rand = ammo[Math.floor(Math.random() * ammo.length)]
              loot = loot + "{\"itemname\": \"" + ammo_rand + " enchanted + 1\"};"}
          if(amt_pot_animal_friendship > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_animal_friendship + "\", \"itemname\": \"potion(s) of animal friendship\", \"itemweight\": \"0.5\", \"itemcontent\": \"(When you drink this potion, you can cast the animal friendship spell (save DC 13) for 1 hour at will. Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair.\"};"}
          if(amt_pot_hill_giant_str > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_hill_giant_str + "\", \"itemname\": \"potion(s) of hill giant strength\", \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, your Strength score changes to 21 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score. This potion's transparent liquid has floating in it a sliver of fingernail from a hill giant.\"};"}
          if(amt_pot_growth > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_growth + "\", \"itemname\": \"potion(s) of growth\", \"itemweight\": \"0.5\", \"itemcontent\": \"(When you drink this potion, you gain the \"enlarge\" effect of the enlarge/reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.\"};"}
          if(amt_pot_water_breathing > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_water_breathing + "\", \"itemname\": \"potion(s) of water breathing\", \"itemweight\": \"0.5\", \"itemcontent\": \"You can breathe underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.\"};"}
          for(;amt_ss_2 > 0; amt_ss_2--) {loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"Spell scroll of " + scroll_spell(2) + " (lvl 2)\"};"}
          for(;amt_ss_3 > 0; amt_ss_3--) {loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"Spell scroll of " + scroll_spell(3) + " (lvl 3)\"};"}
          if(amt_bag_of_holding > 0) {loot = loot + "{\"itemcount\": \"" + amt_bag_of_holding + "\", \"itemname\": \"bag(s) of holding\", \"itemweight\": \"15\", \"itemcontent\": \"This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.\"};"}
          if(amt_keoghtoms_ointment > 0) {loot = loot + "{\"itemcount\": \"" + amt_keoghtoms_ointment + "\", \"itemname\": \"Keoghtom's Ointment(s)\", \"itemweight\": \"0.5\", \"itemcontent\": \"This glass jar, 3 inches in diameter, contains " + (RandomInt(4) + 1) + " doses of a thick mixture that smells faintly of aloe. As an action, one dose of the ointment can be swallowed or applied to the skin. The creature that receives it regains 2d8 + 2 hit points, ceases to be poisoned, and is cured of any disease.\"};"}
          if(amt_oil_slipperiness > 0) {loot = loot + "{\"itemcount\": \"" + amt_oil_slipperiness + "\", \"itemname\": \"oil(s) of slipperiness\", \"itemweight\": \"1\", \"itemcontent\": \"This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of a freedom ofmovement spell for 8 hours. Alternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the grease spell in that area for 8 hours.\"};"}
          if(amt_dust_disappearance > 0) {loot = loot + "{\"itemcount\": \"" + amt_dust_disappearance + "\", \"itemname\": \"dust(s) of dissappearance\", \"itemweight\": \"0.1\", \"itemcontent\": \"Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its magic takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature.\"};"}
          if(amt_dust_dryness > 0) {loot = loot + "{\"itemcount\": \"" + amt_dust_dryness + "\", \"itemname\": \"dust(s) of dryness\", \"itemcontent\": \"itemweight\": \"0.1\", \"This small packet contains " + (RandomInt(6) + 4) + " pinches of dust. You can use an action to sprinkle a pinch of it over water. The dust turns a cube of water 15 feet on a side into one marble-sized pellet, which floats or rests near where the dust was sprinkled. The pellet's weight is negligible. Someone can use an action to smash the pellet against a hard surface, causing the pellet to shatter and release the water the dust absorbed. Doing so ends that pellet's magic. An elemental composed mostly of water that is exposed to a pinch of the dust must make a DC 13 Constitution saving throw, taking 10d6 necrotic damage on a failed save, or half as much damage on a successful one.\"};"}
          if(amt_dust_sneezing_choking > 0) {loot = loot + "{\"itemcount\": \"" + amt_dust_sneezing_choking + "\", \"itemname\": \"dust(s) of dissappearance(sc)\", \"itemweight\": \"0.1\", \"itemcontent\": \"Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its magic takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature.\"};"}
          if(amt_elemental_gem > 0) {
              elemental_gem_types = [
                  'blue sapphire (air elemental)',
                  'yellow diamond (earth elemental)',
                  'red corundum (fire elemental)',
                  'emerald (water elemental)',
              ]
              elemental_gem_rand = elemental_gem_types[Math.floor(Math.random() * elemental_gem_types.length)]
              loot = loot + "{\"itemcount\": \"" + "\", \"itemname\": \"" + elemental_gem_rand + " gem\", \"itemcontent\": \"This gem contains a mote of elemental energy. When you use an action to break the gem, an elemental is summoned as if you had cast the conjure elemental spell, and the gem's magic is lost. The type of gem determines the elemental summoned by the spell.\"};"}
          if(amt_philter_love > 0) {loot = loot + "{\"itemcount\": \"" + amt_philter_love + "\", \"itemname\": \"philter(s) of love\", \"itemweight\": \"0.5\", \"itemcontent\": \"The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed. This potion's rose-hued, effervescent liquid contains one easy-to-mis bubble shaped like a heart.\"};"}
          if(amt_alchemy_jug > 0) {loot = loot + "{\"itemcount\": \"" + amt_alchemy_jug + "\", \"itemname\": \"alchemy jug(s)\", \"itemweight\": \"12\", \"itemcontent\": \"This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty. You can use an action and name one liquid from the table on page 150 of the DMG to cause the jug to produce the chosen liquid. Afterward, you can uncork the jug as an action and pour that liquid out, up to 2 gallons per minute. The maximum amount of liquid the jug can produce depends on the liquid you named. Once the jug starts producing a liquid, it can't produce a different one, or more of one that has reached its maximum, until the next dawn.\"};"}
          if(amt_cap_water_breathing > 0) {loot = loot + "{\"itemcount\": \"" + amt_cap_water_breathing + "\", \"itemname\": \"cap(s) of water breathing\", \"itemweight\": \"0.5\", \"itemcontent\": \"While wearing this cap underwater, you can speak its command word as an action to create a bubble of air around your head. It allows you to breathe normally underwater. This bubble stays with you until you speak the command word again , the cap is removed, or you are no longer underwater.\"};"}
          if(amt_cloak_manta_ray > 0) {loot = loot + "{\"itemcount\": \"" + amt_cloak_manta_ray + "\", \"itemname\": \"cloak(s) of the manta ray\", \"itemweight\": \"2\", \"itemcontent\": \"While wearing this cloak with its hood up, you can breathe underwater, and you have a swimming speed of 60 feet. Pulling the hood up or down requires an action.\"};"}
          if(amt_driftglobe > 0) {loot = loot + "{\"itemcount\": \"" + amt_driftglobe + "\", \"itemname\": \"driftglobe(s)\", \"itemweight\": \"1\", \"itemcontent\": \"This small sphere of thick glass weighs 1 pound. If you are within 60 feet of it, you can speak its command word and cause it to emanate the light or daylight spell. Once used, the daylight effect can't be used again until the next dawn. You can speak another command word as an action to make the illuminated globe rise into the air and float no more than 5 feet off the ground. The globe hovers in this way until you or another creature grasps it. Ifyou mpve more than 60 feet from the hovering globe, it follows you until it is within 60 feet of you. It takes the shortest route to do so. If prevented from moving, the globe sinks gently to the ground and becomes inactive, and its light winks out.\"};"}
          if(amt_goggles_night > 0) {loot = loot + "{\"itemcount\": \"" + amt_goggles_night + "\", \"itemname\": \"goggles of night\", \"itemweight\": \"1\", \"itemcontent\": \"While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision. wearing the goggles increases its range by 60 feet.\"};"}
          if(amt_helm_comprehending_languages > 0) {loot = loot + "{\"itemcount\": \"" + amt_helm_comprehending_languages + "\", \"itemname\": \"helm(s) of comprehending languages\", \"itemweight\": \"2\", \"itemcontent\": \"While wearing this helm, you can use an action to cast the comprehend languages spell from it at will.\"};"}
          if(amt_immovable_rod > 0) {loot = loot + "{\"itemcount\": \"" + amt_immovable_rod + "\", \"itemname\": \"immovable rod(s)\", \"itemweight\": \"0.5\", \"itemcontent\": \"This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success.\"};"}
          if(amt_lantern_revealing > 0) {loot = loot + "{\"itemcount\": \"" + amt_lantern_revealing + "\", \"itemname\": \"lantern(s) of revealing\", \"itemweight\": \"1\", \"itemcontent\": \"While lit, this hooded lantern burns for 6 hours on 1 pint of o'il, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius.\"};"}
          for(; amt_mariners_armor > 0; amt_mariners_armor--) {
            rand_armour = choose_armor();
            loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"" + rand_armour[0] + " mariner's armor\", \"itemweight\": \"" + rand_armour[3] + "\", \"ac\": \"" + rand_armour[1] + "\", \"itemcontent\": \"While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, the armor causes you to rise 60 feet toward the surface. The armor is decorated with fish and shell motifs.\"};"
          }
          for(; amt_mithral_armor > 0; amt_mithral_armor--) {
            rand_armour = choose_armor("mithral");
            loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"" + rand_armour[0] + " mithral armor\", \"itemweight\": \"" + (rand_armour[3]/2) + "\", \"ac\": \"" + rand_armour[1] + "\", \"itemcontent\": \"Mithral is a light, flexible metal. A mithral chain shirt or breastplate can be worn under normal clothes. I£ the armor normally imposes disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't.\"};"
          }
          if(amt_potion_poison > 0) {loot = loot + "{\"itemcount\": \"" + amt_potion_poison + "\", \"itemname\": \"potion(s) of poison\", \"itemweight\": \"0.5\", \"itemcontent\": \"7500 gp each\"};"}
          if(amt_ring_swimming > 0) {loot = loot + "{\"itemcount\": \"" + amt_ring_swimming + "\", \"itemname\": \"ring(s) of swimming\", \"itemweight\": \"0.5\", \"itemcontent\": \"7500 gp each\"};"}
          if(amt_robe_useful_items > 0) {loot = loot + "{\"itemcount\": \"" + amt_robe_useful_items + "\", \"itemname\": \"robe(s) of useful items\", \"itemweight\": \"0.5\", \"itemcontent\": \"7500 gp each\"};"}
          if(amt_rope_climbing > 0) {loot = loot + "{\"itemcount\": \"" + amt_rope_climbing + "\", \"itemname\": \"rope(s) of climbing\", \"itemweight\": \"0.5\", \"itemcontent\": \"7500 gp each\"};"}
          if(amt_saddle_cavalier > 0) {loot = loot + "{\"itemcount\": \"" + amt_saddle_cavalier + "\", \"itemname\": \"saddle(s) of the cavalier\", \"itemweight\": \"0.5\", \"itemcontent\": \"7500 gp each\"};"}
          if(amt_wand_magic_detection > 0) {loot = loot + "{\"itemcount\": \"" + amt_wand_magic_detection + "\", \"itemname\": \"wand(s) of magic detection\", \"itemweight\": \"0.5\", \"itemcontent\": \"7500 gp each\"};"}
          if(amt_wand_secrets > 0) {loot = loot + "{\"itemcount\": \"" + amt_wand_secrets + "\", \"itemname\": \"wand(s) of secrets\", \"itemweight\": \"0.5\", \"itemcontent\": \"7500 gp each\"};"}
      }
      
      //Magic Item Table C
      if(amt_mit_c > 0) {
          
          // sendChat(msg.who, "/w gm " + amt_mit_c + " magical items (table C)")
          
              /* 01-15 */ amt_pot_superior_healing = 0
              /* 16-22 */ amt_ss_4 = 0
              /* 23-27 */ amt_ammo_2 = 0
              /* 28-32 */ amt_pot_clairvoyance = 0
              /* 33-37 */ amt_pot_diminution = 0
              /* 38-42 */ amt_pot_gaseous_form = 0
              /* 43-47 */ amt_pot_frost_giant_strength = 0
              /* 48-52 */ amt_pot_stone_giant_strength = 0
              /* 53-57 */ amt_pot_heroism = 0
              /* 58-62 */ amt_pot_invulnerability = 0
              /* 63-67 */ amt_pot_mind_reading = 0
              /* 68-72 */ amt_ss_5 = 0
              /* 73-75 */ amt_elixir_health = 0
              /* 76-78 */ amt_oil_etherealness = 0
              /* 79-81 */ amt_pot_fire_giant_strength = 0
              /* 82-84 */ amt_quaals_feather_token = 0
              /* 85-87 */ amt_scroll_protection = 0
              /* 88-89 */ amt_bag_beans = 0
              /* 90-91 */ amt_bead_force = 0
              /* 92 */ amt_chime_opening = 0
              /* 93 */ amt_decanter_endless_water = 0
              /* 94 */ amt_eyes_minute_seeing = 0
              /* 95 */ amt_folding_boat = 0
              /* 96 */ amt_hewards_handy_haversack = 0
              /* 97 */ amt_horseshoes_speed = 0
              /* 98 */ amt_necklace_fireballs = 0
              /* 99 */ amt_periapt_health = 0
              /* 100 */ amt_sending_stones = 0
          
          for(mit_d100 = RandomInt(100); amt_mit_c > 0; amt_mit_c--, mit_d100 = RandomInt(100)) {
              // sendChat(msg.who, "/w gm Rolled a " + mit_d100)
              if(mit_d100 < 16) {amt_pot_superior_healing++}
              else if(mit_d100 < 23) {amt_ss_4++}
              else if(mit_d100 < 28) {amt_ammo_2++}
              else if(mit_d100 < 33) {amt_pot_clairvoyance++}
              else if(mit_d100 < 38) {amt_pot_diminution++}
              else if(mit_d100 < 43) {amt_pot_gaseous_form++}
              else if(mit_d100 < 48) {amt_pot_frost_giant_strength++}
              else if(mit_d100 < 53) {amt_pot_stone_giant_strength++}
              else if(mit_d100 < 58) {amt_pot_heroism++}
              else if(mit_d100 < 63) {amt_pot_invulnerability++}
              else if(mit_d100 < 68) {amt_pot_mind_reading++}
              else if(mit_d100 < 73) {amt_ss_5++}
              else if(mit_d100 < 76) {amt_elixir_health++}
              else if(mit_d100 < 79) {amt_oil_etherealness++}
              else if(mit_d100 < 82) {amt_pot_fire_giant_strength++}
              else if(mit_d100 < 85) {amt_quaals_feather_token++}
              else if(mit_d100 < 88) {amt_scroll_protection++}
              else if(mit_d100 < 90) {amt_bag_beans++}
              else if(mit_d100 < 92) {amt_bead_force++}
              else if(mit_d100 == 92) {amt_chime_opening++}
              else if(mit_d100 == 93) {amt_decanter_endless_water++}
              else if(mit_d100 == 94) {amt_eyes_minute_seeing++}
              else if(mit_d100 == 95) {amt_folding_boat++}
              else if(mit_d100 == 96) {amt_hewards_handy_haversack++}
              else if(mit_d100 == 97) {amt_horseshoes_speed++}
              else if(mit_d100 == 98) {amt_necklace_fireballs++}
              else if(mit_d100 == 99) {amt_periapt_health++}
              else if(mit_d100 == 100) {amt_sending_stones++}
          }
          
          //Display results in chat
          
          if(amt_pot_superior_healing > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_superior_healing + "\", \"itemname\": \"potion(s) of superior healing\", \"itemweight\": \"0.5\", \"itemcontent\": \"You regain 8d4 + 8 hit points when you drink this potion. The potion's red liquid glimmers when agitated.\"};"}
          for(;amt_ss_4 > 0; amt_ss_4--) {loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"Spell scroll of " + scroll_spell(4) + " (lvl 4)\"};"}
          for(;amt_ammo_2 > 0; amt_ammo_2--) {
              ammo_rand = ammo[Math.floor(Math.random() * ammo.length)]
              loot = loot + "{\"itemname\": \"" + ammo_rand + " enchanted + 2\"};"}
          }      
          if(amt_pot_clairvoyance > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_clairvoyance + "\", \"itemname\": \"potion(s) of clairvoyance\", \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, you gain the effect of the clairvoyance spell. An eyeball bobs in this yellowish liquid but vanishes when the potion is opened.\"};"}
          if(amt_pot_diminution > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_diminution + "\", \"itemname\": \"potion(s) of diminution\", \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, you gain the \"reduce\" effect of the enlarge/reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.\"};"}
          if(amt_pot_gaseous_form > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_gaseous_form + "\", \"itemname\": \"potion(s) of gaseous form\", \"itemweight\": \"0.5\", \"itemcontent\": \" When you drink this potion, you gain the effect of the gaseous form spell for 1 hour (no concentration required) or until you end the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water.\"};"}
          if(amt_pot_frost_giant_strength > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_frost_giant_str + "\", \"itemname\": \"potion(s) of frost giant strength\", \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, your Strength score changes to 23 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score. This potion's transparent liquid has floating in it a sliver of fingernail from a frost giant.\"};"}
          if(amt_pot_stone_giant_strength > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_stone_giant_str + "\", \"itemname\": \"potion(s) of stone giant strength\", \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, your Strength score changes to 23 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score. This potion's transparent liquid has floating in it a sliver of fingernail from a stone giant.\"};"}
          if(amt_pot_heroism > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_heroism + "\", \"itemname\": \"potion(s) of heroism\", \"itemweight\": \"0.5\", \"itemcontent\": \"For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour. For the same duration, you are under the effect of the bless spell (no concentration required). This blue potion bubbles and steams as if boiling.\"};"}
          if(amt_pot_invulnerability > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_invulnerability + "\", \"itemname\": \"potion(s) of invulnerability\", \"itemweight\": \"0.5\", \"itemcontent\": \" For 1 minute after you drink this potion, you have resistance to all damage. The potion's syrupy liquid looks like liquified iron.\"};"}
          if(amt_pot_mind_reading > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_mind_reading + "\", \"itemname\": \"potion(s) of mind reading\", \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, you gain the effect of the detect thoughts spell (save DC 13). The potion's dense, purple liquid has an ovoid cloud of pink floating in it.\"};"}
          for(;amt_ss_5 > 0; amt_ss_5--) {loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"Spell scroll of " + scroll_spell(5) + " (lvl 5)\"};"}
          if(amt_elixir_health > 0) {loot = loot + "{\"itemcount\": \"" + amt_elixir_health + "\", \"itemname\": \"elixir(s) of health\", \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, it cures any disease afflicting you, and it removes the blinded, deafened, paralyzed, and poisoned conditions. The clear red liquid has tiny bubbles of light in it.\"};"}
          if(amt_oil_etherealness > 0) {loot = loot + "{\"itemcount\": \"" + amt_oil_etherealness + "\", \"itemname\": \"oil(s) of etherealness\", \"itemweight\": \"0.5\", \"itemcontent\": \"Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the etherealness spell for 1 hour.\"};"}
          if(amt_pot_fire_giant_strength > 0) {loot = loot + "{\"itemcount\": \"" + amt_pot_fire_giant_str + "\", \"itemname\": \"potion(s) of fire giant strength\", \"itemweight\": \"0.5\", \"itemcontent\": \"When you drink this potion, your Strength score changes to 25 for 1 hour. The potion has no effect on you if your Strength is equal to or greater than that score. This potion's transparent liquid has floating in it a sliver of fingernail from a fire giant.\"};"}
          for(quaals_token_roll = RandomInt(100); amt_quaals_feather_token > 0; amt_quaals_feather_token--, quaals_token_roll = RandomInt(100)) {
              if(quaals_token_roll < 21) {loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"Quaal's feather token (anchor)\", \"itemweight\": \"0.1\", \"itemcontent\": \"This tiny object looks like a feather.You can use an action to touch the token to a boat or ship. For the next 24 hours, the vessel can't be moved by any means. Touching the token to the vessel again ends the effect. When the effect ends, the token disappears.\"};"}
              else if(quaals_token_roll < 36) {"{\"itemcount\": \"1\", \"itemname\": \"Quaal's feather token (bird)\", \"itemweight\": \"0.1\", \"itemcontent\": \"This tiny object looks like a feather. You can use an action to toss the token 5 feet into the air. The token disappears and an enormous, multicolored bird takes its place. The bird has the statistics of a roc (see the Monster Manual), but it obeys your simple commands and can't attack. It can carry up to 500 pounds while flying at its maximum speed (16 miles an hour for a maximum of 144 miles per day. with a one-hour rest for every 3 hours of flying), or 1,000 pounds at half that speed. The bird disappears after flying its maximum distance for a day or if it drops to 0 hit points. You can dismiss the bird as an action.\"};"}
              else if(quaals_token_roll < 51) {"{\"itemcount\": \"1\", \"itemname\": \"Quaal's feather token (fan)\", \"itemweight\": \"0.1\", \"itemcontent\": \"This tiny object looks like a feather. If you are on a boat or ship, you can use an action to toss the token up to 10 feet in the air. The token disappears, and a giant flapping fan takes its place. The fan floats and creates a wind strong enough to fill the sails of one ship, increasing its speed by 5 miles per hour for 8 hours. You can dismiss the fan as an action.\"};"}
              else if(quaals_token_roll < 66) {"{\"itemcount\": \"1\", \"itemname\": \"Quaal's feather token (swan boat)\", \"itemweight\": \"0.1\", \"itemcontent\": \"This tiny object looks like a feather. You can use an action to touch the token to a body of water at least 60 feet in diameter. The token disappears, and a 50-foot-long, 20-foot-wide boat shaped like a swan takes its place. The boat is self-propelled and moves across water at a speed of 6 miles per hour. You can use an action while on the boat to command it to move or to turn up to 90 degrees. The boat can carry up to thirty-two Medium or smaller creatures. A Large creature counts as four Medium creatures, while a Huge creature counts as nine. The boat remains for 24 hours and then disappears. You can dismiss the boat as an action.\"};"}
              else if(quaals_token_roll < 91) {"{\"itemcount\": \"1\", \"itemname\": \"Quaal's feather token (tree)\", \"itemweight\": \"0.1\", \"itemcontent\": \"This tiny object looks like a feather. You must be outdoors to use this token. You can use an action to touch it to an unoccupied space on the ground. The token disappears, and in its place a nonmagical oak tree springs into existence. The tree is 60 feet tall and has a 5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius.\"};"}
              else if(quaals_token_roll < 101) {"{\"itemcount\": \"1\", \"itemname\": \"Quaal's feather token (whip)\", \"itemweight\": \"0.1\", \"itemcontent\": \"This tiny object looks like a feather. You can use an action to throw the token to a point within 10 feet of you. The token disappears, and a floating whip takes its place. You can then use a bonus action to make a melee spell attack against a creature within 10 feet of the whip, with an attack bonus of +9. On a hit, the target takes 1d6 + 5 force damage. As a bonus action on your turn, you can direct the whip to fly up to 20 feet and repeat the attack against a creature within 10 feet of it. The whip disappears after 1 hour, when you use an action to dismiss it, or when you are incapacitated or die.\"};"}
          }
          for(scroll_protection_roll = RandomInt(100); amt_scroll_protection > 0; amt_scroll_protection--, scroll_protection_roll = RandomInt(100)) {
              if(scroll_protection_roll < 11) {scroll_protection_type = 'aberrations'}
              else if(scroll_protection_roll < 21) {scroll_protection_type = 'beasts'}
              else if(scroll_protection_roll < 31) {scroll_protection_type = 'celestials'}
              else if(scroll_protection_roll < 41) {scroll_protection_type = 'elementals'}
              else if(scroll_protection_roll < 51) {scroll_protection_type = 'fey'}
              else if(scroll_protection_roll < 76) {scroll_protection_type = 'fiends'}
              else if(scroll_protection_roll < 81) {scroll_protection_type = 'plants'}
              else if(scroll_protection_roll < 101) {scroll_protection_type = 'undead'}
              loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"Scroll of protection (" + scroll_protection_type + ")\", \"itemcontent\": \"Using an action to read the scroll encloses you in a invisible barrier that extends from you to form a 5-foot- radius, 10-foot-high cylinder. For 5 minutes, this barrier prevents creatures of the specified type from entering or affecting anything within the cylinder. The cylinder moves with you and remains centered on you. However, if you move in such a way that a creature of the specified type would be inside the cylinder, the effect ends. A creature can attempt to overcome the barrier by using an action to make a DC 15 Charisma check. On a success, the creature ceases to be affected by the barrier.\"};"
          }
          for(bag_beans_contents = Math.floor(RandomInt(4) + RandomInt(4) + RandomInt(4));
              amt_bag_beans > 0; 
              amt_bag_beans--, bag_beans_contents = Math.floor(RandomInt(4) + RandomInt(4) + RandomInt(4))) {
              	loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"Bag of Beans\", \"itemweight\": \"" + (0.5 + (0.25*bag_beans_contents)) + "\", \"itemcontent\": \"Inside this heavy cloth bag are " + bag_beans_contents + " dry beans. The bag weighs 1/2 pound plus 1/4 pound for each bean it contains. If you dump the bag's contents out on the ground, they explode in a 10-foot radius, extending from the beans. Each creature in the area, including you, must make a DC 15 Dexterity saving throw, taking 5d4 fire damage on a failed save, or half as much damage on a successful one. The fire ignites flammable objects in the area that aren't being worn or carried. If you remove a bean from the bag, plant it in dirt or sand, and then water it, the bean produces an effect 1 minute later from the ground where it was planted. The DM can choose an effect from the following table, determine it randomly, or create an effect.\"};"
          }
          for(bead_force_qty = Math.floor(RandomInt(4) + 4); amt_bead_force > 0; 
              amt_bead_force--, bead_force_qty = Math.floor(RandomInt(4) + 4)) {
              loot = loot + "{\"itemcount\": \"" + bead_force_qty + "\", \"itemname\": \"Bead of Force\", \"itemweight\": \"0.0625\", \"itemcontent\": \"This small black sphere measures 3/4 of an inch in diameter and weighs an ounce. You can use an action to throw the bead up to 60 feet. The bead explodes on impact and is destroyed. Each creature within a 10-foot radius of where the bead landed must succeed on a DC 15 Dexterity saving throw or take 5d4 force damage. A sphere of transparent force then encloses the area for 1 minute. Any creature that failed the save and is completely within the area is trapped inside this sphere. Creatures that succeeded on the save, or are partially within the area, are pushed away from the center of the sphere until they are no longer inside it. Only breathable air can pass through the sphere's wall. No attack or other effect can. An enclosed creature can use its action to push against the sphere's wall, moving the sphere up to half the creature's walking speed. The sphere can be picked up, and its magic causes it to weigh only 1 pound, regardless of the weight of creatures inside.\"};"
          }

          if(amt_chime_opening > 0) {loot = loot + "{\"itemcount\": \"" + amt_chime_opening + "\", \"itemname\": \"Chime(s) of Opening\", \"itemweight\": \"1\", \"itemcontent\": \"This hollow metal tube measures about 1 foot long and :-veighs 1 pound. You can strike it as an action, pointing 1t at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens. The chime can be used ten times. After the tenth time it cracks and becomes useless.\"};"}
          if(amt_decanter_endless_water > 0) {loot = loot + "{\"itemcount\": \"" + amt_decanter_endless_water + "\", \"itemname\": \"decanter(s) of endless water\", \"itemweight\": \"2\", \"itemcontent\": \"This stoppered flask sloshes when shaken, as if it contains water. The decanter weighs 2 pounds. You can use an action to remove the stopper and speak one of three command words, whereupon an amount of fresh water or salt water (your choice) pours out of the flask. The water stops pouring out at the start of your next turn. Choose from the following options: \"Stream\" produces 1 gallon of water. \"Fountain\" produces 5 gallons of water. • \"Geyser\" produces 30 gallons of water that gushes forth in a geyser 30 feet long and 1 foot wide. As a bonus action while holding the decanter, you can aim the geyser at a creature you can see within 30 feet of you. The target must succeed on a DC 13 Strength saving throw or take 1d4 bludgeoning damage and fall prone. Instead of a creature, you can target an object that isn't being worn or carried and that weighs no more than 200 pounds. The object is either knocked over or pushed up to 15 feet away from you.\"};"}
          if(amt_eyes_minute_seeing > 0) {loot = loot + "{\"itemcount\": \"" + amt_eyes_minute_seeing + "\", \"itemname\": \"eye(s) of minute seeing\", \"itemweight\": \"1\", \"itemcontent\": \"These crystal lenses fit over the eyes. While wearing them, you can see much better than normal out to a range of 1 foot. You have advantage on Intelligence (Investigation) checks that rely on sight while searching an area or studying an object within that range.\"};"}
          if(amt_folding_boat > 0) {loot = loot + "{\"itemcount\": \"" + amt_folding_boat + "\", \"itemname\": \"folding boat(s)\", \"itemweight\": \"4\", \"itemcontent\": \"One command word causes the box to unfold into a boat 10 feet long, 4 feet wide, and 2 feet deep. The boat has one pair of oars, an anchor, a mast, and a lateen sail. The boat can hold up to four Medium creatures comfortably. The second command word causes the box to unfold into a ship 24 feet long, 8 feet wide, and 6 feet deep. The ship has a deck, rowing seats, five sets of oars, a steering oar, an anchor, a deck cabin, and a mast with a square sail. The ship can hold fifteen Medium creatures comfortably. When the box becomes a vessel, its weight becomes that of a normal vessel its size, and anything that was stored in the box remains in the boat. The third command word causes the folding boat to fold back into a box, provided that no creatures are aboard. Any objects in the vessel that can't fit inside the box remain outside the box as it folds. Any objects in the vessel that can fit inside the box do so.\"};"}
          if(amt_hewards_handy_haversack > 0) {loot = loot + "{\"itemcount\": \"" + amt_hewards_handy_haversack + "\", \"itemname\": \"Heward's handy haversack(s)\", \"itemweight\": \"5\", \"itemcontent\": \"This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The large central pouch can hold up to 8 cubic feet or 80 pounds of material. The backpack always weighs 5 pounds, regardless of its contents. Placing an object in the haversack follows the normal rules for interacting with objects. Retrieving an item from the haversack requires you to use an action. When you reach into the haversack for a specific item, the item is always magically on top. The haversack has a few limitations. If it is overloaded, or if a sharp object pierces it or tears it, the haversack ruptures and is destroyed. If the haversack is destroyed, its contents are lost forever, although an artifact always turns up again somewhere. If the haversack is turned inside out, its contents spill forth, unharmed, and the haversack must be put right before it can be used again. If a breathing creature is placed within the haversack, the creature can survive for up to 10 minutes, after which time it begins to suffocate. Placing the haversack inside an extradimensional space created by a bag ofholding, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10-feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.\"};"}
          if(amt_horseshoes_speed > 0) {loot = loot + "{\"itemcount\": \"" + amt_horseshoes_speed + "\", \"itemname\": \"set(s) of horseshoes of speed\", \"itemweight\": \"12\", \"itemcontent\": \"These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they increase the creature's walking speed by 30 feet.\"};"

      }
          for(necklace_fireballs_beads = Math.floor(RandomInt(6) + 3); amt_necklace_fireballs > 0; 
              amt_necklace_fireballs--, necklace_fireballs_beads = Math.floor(RandomInt(6) + 3)) {
              loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"Necklace of fireballs\", \"itemweight\": \"0.5\", \"itemcontent\": \"This necklace has " + necklace_fireballs_beads + " beads hanging from it. You can use an action to detach a bead and throw it up to 6 feet away. When it reaches the end of its trajectory, the bead detonates as a 3rd-level fireball spell (save DC 15). You can hurl multiple beads, or even the whole necklace, as one action. When you do so, increase the level of the fireball by 1 for each bead beyond the first.\"};"
          }          
          if(amt_periapt_health > 0) {loot = loot + "{\"itemcount\": \"" + amt_periapt_health + "\", \"itemname\": \"periapt(s) of health\", \"itemweight\": \"0.5\", \"itemcontent\": \"You are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the effects of the disease are suppressed you while you wear the pendant.\"};"}
          if(amt_sending_stones > 0) {loot = loot + "{\"itemcount\": \"" + amt_sending_stones + "\", \"itemname\": \"pair(s) of sending stones\", \"itemweight\": \"0.5\", \"itemcontent\": \"Sending stones come in pairs, with each smooth stone carved to match the other so the pairing is easily recognized. While you touch one stone, you can use an action to cast the sending spell from it. The target is the bearer of the other stone. If no creature bears the other stone, you know that fact as soon as you use the stone and don't cast the spell. Once sending is cast through the stones, they can't be used again until the next dawn. If one of the stones in a pair is destroyed, the other one becomes nonmagical.\"};"}
      }

      //Magic Item Table D -- NOT COMPLETE
      if(amt_mit_d > 0) {
          
          amt_mit_d_itemlist = [
              /* 01-20 */ amt_pot_supreme_healing = 0,
              /* 21-30 */ amt_pot_invisibility = 0,
              /* 31-40 */ amt_pot_speed = 0,
              /* 41-50 */ amt_spell_scroll_6 = 0,
              /* 51-57 */ amt_spell_scroll_7 = 0,
              /* 58-62 */ amt_ammunition3 = 0,
              /* 63-67 */ amt_oil_sharpness = 0,
              /* 68-72 */ amt_pot_flying = 0,
              /* 73-77 */ amt_pot_cloud_giant_str = 0,
              /* 78-82 */ amt_pot_longevity = 0,
              /* 83-87 */ amt_pot_vitality = 0,
              /* 88-92 */ amt_spell_scroll_8 = 0,
              /* 93-95 */ amt_zephyr_horseshoe = 0,
              /* 96-98 */ amt_marvelous_pigments = 0,
              /* 99 */ amt_bag_devouring = 0,
              /* 00 */ amt_portable_hole = 0
          ]
          
          for(mit_d100 = RandomInt(100); amt_mit_d > 0; amt_mit_d--, mit_d100 = RandomInt(100)) {
              // sendChat(msg.who, "/w gm Rolled a " + mit_d100)
              if(mit_d100 < 21) {amt_pot_supreme_healing++}
              else if(mit_d100 < 31) {amt_pot_invisibility++}
              else if(mit_d100 < 41) {amt_pot_speed++}
              else if(mit_d100 < 51) {amt_spell_scroll_6++}
              else if(mit_d100 < 58) {amt_spell_scroll_7++}
              else if(mit_d100 < 63) {amt_ammunition3++}
              else if(mit_d100 < 68) {amt_oil_sharpness++}
              else if(mit_d100 < 73) {amt_pot_flying++}
              else if(mit_d100 < 78) {amt_pot_cloud_giant_str++}
              else if(mit_d100 < 83) {amt_pot_longevity++}
              else if(mit_d100 < 88) {amt_pot_vitality++}
              else if(mit_d100 < 93) {amt_spell_scroll_8++}
              else if(mit_d100 < 96) {amt_zephyr_horseshoe++}
              else if(mit_d100 < 99) {amt_marvelous_pigments++}
              else if(mit_d100 < 100) {amt_bag_devouring++}
              else if(mit_d100 == 100) {amt_portable_hole++}
          }
          
          //Display results in chat
          
          if(amt_pot_supreme_healing > 0) {loot = loot + "" + amt_pot_supreme_healing + " potion(s) of supreme healing;"}
          for(;amt_ss_4 > 0; amt_ss_4--) {loot = loot + "" + "Spell scroll of " + scroll_spell(4) + " (lvl 4);"}
          for(;amt_ammo_2 > 0; amt_ammo_2--) {
              ammo_rand = ammo[Math.floor(Math.random() * ammo.length)]
              loot = loot + "" + ammo_rand + " enchanted + 2;"
          }      
          if(amt_pot_clairvoyance > 0) {loot = loot + "" + amt_pot_clairvoyance + " potion(s) of clairvoyance;"}
          if(amt_pot_diminution > 0) {loot = loot + "" + amt_pot_diminution + " potion(s) of diminution;"}
          if(amt_pot_gaseous_form > 0) {loot = loot + "" + amt_pot_gaseous_form + " potion(s) of gaseous form;"}
          if(amt_pot_frost_giant_strength > 0) {loot = loot + "" + amt_pot_frost_giant_strength + " potion(s) of frost giant strength;"}
          if(amt_pot_stone_giant_strength > 0) {loot = loot + "" + amt_pot_stone_giant_strength + " potion(s) of stone giant strength;"}
          if(amt_pot_heroism > 0) {loot = loot + "" + amt_pot_heroism + " potion(s) of heroism;"}
          if(amt_pot_invulnerability > 0) {loot = loot + "" + amt_pot_invulnerability + " potion(s) of invulnerability;"}
          if(amt_pot_mind_reading > 0) {loot = loot + "" + amt_pot_mind_reading + " potion(s) of mind reading;"}
          for(;amt_ss_5 > 0; amt_ss_5--) {loot = loot + "" + "Spell scroll of " + scroll_spell(5) + " (lvl 5);"}
          if(amt_elixir_health > 0) {loot = loot + "" + amt_elixir_health + " elixir(s) of health;"}
          if(amt_oil_etherealness > 0) {loot = loot + "" + amt_oil_etherealness + " oil(s) of etherealness;"}
          if(amt_pot_fire_giant_strength > 0) {loot = loot + "" + amt_pot_fire_giant_strength + " potion(s) of fire giant strength;"}
          for(quaals_token_roll = RandomInt(100); amt_quaals_feather_token > 0; amt_quaals_feather_token--, quaals_token_roll = RandomInt(100)) {
              if(quaals_token_roll < 21) {quaals_token_type = 'anchor'}
              else if(quaals_token_roll < 36) {quaals_token_type = 'bird'}
              else if(quaals_token_roll < 51) {quaals_token_type = 'fan'}
              else if(quaals_token_roll < 66) {quaals_token_type = 'swan boat'}
              else if(quaals_token_roll < 91) {quaals_token_type = 'tree'}
              else if(quaals_token_roll < 101) {quaals_token_type = 'whip'}
              loot = loot + "" + "/w gm Quaal's feather token (" + quaals_token_type + ");"
          }
          for(scroll_protection_roll = RandomInt(100); amt_scroll_protection > 0; amt_scroll_protection--, scroll_protection_roll = RandomInt(100)) {
              if(scroll_protection_roll < 11) {scroll_protection_type = 'aberrations'}
              else if(scroll_protection_roll < 21) {scroll_protection_type = 'beasts'}
              else if(scroll_protection_roll < 31) {scroll_protection_type = 'celestials'}
              else if(scroll_protection_roll < 41) {scroll_protection_type = 'elementals'}
              else if(scroll_protection_roll < 51) {scroll_protection_type = 'fey'}
              else if(scroll_protection_roll < 76) {scroll_protection_type = 'fiends'}
              else if(scroll_protection_roll < 81) {scroll_protection_type = 'plants'}
              else if(scroll_protection_roll < 101) {scroll_protection_type = 'undead'}
              loot = loot + "" + "/w gm Scroll of protection (" + scroll_protection_type + ");"
          }
          for(bag_beans_contents = Math.floor(RandomInt(4) + RandomInt(4) + RandomInt(4));
              amt_bag_beans > 0; 
              amt_bag_beans--, bag_beans_contents = Math.floor(RandomInt(4) + RandomInt(4) + RandomInt(4))) {
              loot = loot + "" + "/w gm Bag of (" + bag_beans_contents + ") beans;"
          }
          for(bead_force_qty = Math.floor(RandomInt(4) + 4); amt_bead_force > 0; 
              amt_bead_force--, bead_force_qty = Math.floor(RandomInt(4) + 4)) {
              loot = loot + "" + bead_force_qty + "beads of force;"
          }
          if(amt_chime_opening > 0) {loot = loot + "" + amt_chime_opening + " chime(s) of opening;"}
          if(amt_decanter_endless_water > 0) {loot = loot + "" + amt_decanter_endless_water + " decanter(s) of endless water;"}
          if(amt_eyes_minute_seeing > 0) {loot = loot + "" + amt_eyes_minute_seeing + " eye(s) of minute seeing;"}
          if(amt_folding_boat > 0) {loot = loot + "" + amt_folding_boat + " folding boat(s);"}
          if(amt_hewards_handy_haversack > 0) {loot = loot + "" + amt_hewards_handy_haversack + " Heward's handy haversack(s);"}
          if(amt_horseshoes_speed > 0) {loot = loot + "" + amt_horseshoes_speed + " set(s) of horseshoes of speed;"}
          for(necklace_fireballs_beads = Math.floor(RandomInt(6) + 3); amt_necklace_fireballs > 0; 
              amt_necklace_fireballs--, necklace_fireballs_beads = Math.floor(RandomInt(6) + 3)) {
              loot = loot + "" + "/w gm Necklace of fireballs with" + necklace_fireballs_beads + " beads;"
          }          
          if(amt_periapt_health > 0) {loot = loot + "" + amt_periapt_health + " periapt(s) of health;"}
          if(amt_sending_stones > 0) {loot = loot + "" + amt_sending_stones + " pair(s) of sending stones;"}
      }
          // if(art_ivory_horn > 0) {loot = loot + "{\"itemcount\": \"" + count + "\", \"itemname\": \"name\", \"itemweight\": \"0.5\", \"itemcontent\": \"7500 gp each\"};"}
          // RESUME HERE
      
      //Magic Item Table F
      if(amt_mit_f > 0) {
          
          // sendChat(msg.who, "/w gm " + amt_mit_f + " magical items (table F)")
          
              /* 01-15 */ amt_weapon_1 = 0
              /* 16-18 */ amt_shield_1 = 0
              /* 19-21 */ amt_sentinel_shield = 0
              /* 22-23 */ amt_amulet_proof_against_detection_location = 0
              /* 24-25 */ amt_boots_elvenkind = 0
              /* 26-27 */ amt_boots_striding_springing = 0
              /* 28-29 */ amt_bracers_archery = 0
              /* 30-31 */ amt_brooch_shielding = 0
              /* 32-33 */ amt_broom_flying = 0
              /* 34-35 */ amt_cloak_elvenkind = 0
              /* 36-37 */ amt_cloak_protection = 0
              /* 38-39 */ amt_gauntlets_ogre_power = 0
              /* 40-41 */ amt_hat_disguise = 0
              /* 42-43 */ amt_javelin_lightning = 0
              /* 44-45 */ amt_pearl_power = 0
              /* 46-47 */ amt_rod_pact_keeper_1 = 0
              /* 48-49 */ amt_slippers_spider_climbing = 0
              /* 50-51 */ amt_staff_adder = 0
              /* 52-53 */ amt_staff_python = 0
              /* 54-55 */ amt_sword_vengeance = 0
              /* 56-57 */ amt_trident_fish_command = 0
              /* 58-59 */ amt_wand_magic_missiles = 0
              /* 60-61 */ amt_wand_war_mage_1 = 0
              /* 62-63 */ amt_wand_web = 0
              /* 64-65 */ amt_weapon_warning = 0
              /* 66 */ amt_adamantine_chain_mail = 0
              /* 67 */ amt_adamantine_chain_shirt = 0
              /* 68 */ amt_adamantine_scale_mail = 0
              /* 69 */ amt_bag_tricks_gray = 0
              /* 70 */ amt_bag_tricks_rust = 0
              /* 71 */ amt_bag_tricks_tan = 0
              /* 72 */ amt_boots_winterlands = 0
              /* 73 */ amt_circlet_blasting = 0
              /* 74 */ amt_deck_illusions = 0
              /* 75 */ amt_eversmoking_bottle = 0
              /* 76 */ amt_eyes_charming = 0
              /* 77 */ amt_eyes_eagle = 0
              /* 78 */ amt_figurine_wondrous_power_silver_raven = 0
              /* 79 */ amt_gem_brightness = 0
              /* 80 */ amt_gloves_missile_snaring = 0
              /* 81 */ amt_gloves_swimming_climbing = 0
              /* 82 */ amt_gloves_thievery = 0
              /* 83 */ amt_headband_intellect = 0
              /* 84 */ amt_helm_telepathy = 0
              /* 85 */ amt_instrument_bards_doss_lute = 0
              /* 86 */ amt_instrument_bards_fochlucan_bandore = 0
              /* 87 */ amt_instrument_bards_mac_fuimidh_cittern = 0
              /* 88 */ amt_medallion_thoughts = 0
              /* 89 */ amt_necklace_adaptation = 0
              /* 90 */ amt_periapt_wound_closure = 0
              /* 91 */ amt_pipes_haunting = 0
              /* 92 */ amt_pipes_sewers = 0
              /* 93 */ amt_ring_jumping = 0
              /* 94 */ amt_ring_mind_shielding = 0
              /* 95 */ amt_ring_warmth = 0
              /* 96 */ amt_ring_water_walking = 0
              /* 97 */ amt_quiver_ehlonna = 0
              /* 98 */ amt_stone_good_luck = 0
              /* 99 */ amt_wind_fan = 0
              /* 100 */ amt_winged_boots = 0
  
          for(mit_d100 = RandomInt(100); amt_mit_f > 0; amt_mit_f--, mit_d100 = RandomInt(100)) {
              // sendChat(msg.who, "/w gm Rolled a " + mit_d100)
              if(mit_d100 < 16) {amt_weapon_1++}
              else if(mit_d100 < 19) {amt_shield_1++}
              else if(mit_d100 < 22) {amt_sentinel_shield++}
              else if(mit_d100 < 24) {amt_amulet_proof_against_detection_location++}
              else if(mit_d100 < 26) {amt_boots_elvenkind++}
              else if(mit_d100 < 28) {amt_boots_striding_springing++}
              else if(mit_d100 < 30) {amt_bracers_archery++}
              else if(mit_d100 < 32) {amt_brooch_shielding++}
              else if(mit_d100 < 34) {amt_broom_flying++}
              else if(mit_d100 < 36) {amt_cloak_elvenkind++}
              else if(mit_d100 < 38) {amt_cloak_protection++}
              else if(mit_d100 < 40) {amt_gauntlets_ogre_power++}
              else if(mit_d100 < 42) {amt_hat_disguise++}
              else if(mit_d100 < 44) {amt_javelin_lightning++}
              else if(mit_d100 < 46) {amt_pearl_power++}
              else if(mit_d100 < 48) {amt_rod_pact_keeper_1++}
              else if(mit_d100 < 50) {amt_slippers_spider_climbing++}
              else if(mit_d100 < 52) {amt_staff_adder++}
              else if(mit_d100 < 54) {amt_staff_python++}
              else if(mit_d100 < 56) {amt_sword_vengeance++}
              else if(mit_d100 < 58) {amt_trident_fish_command++}
              else if(mit_d100 < 60) {amt_wand_magic_missiles++}
              else if(mit_d100 < 62) {amt_wand_war_mage_1++}
              else if(mit_d100 < 64) {amt_wand_web++}
              else if(mit_d100 < 66) {amt_weapon_warning++}
              else if(mit_d100 == 66) {amt_adamantine_chain_mail++}
              else if(mit_d100 == 67) {amt_adamantine_chain_shirt++}
              else if(mit_d100 == 68) {amt_adamantine_scale_mail++}
              else if(mit_d100 == 69) {amt_bag_tricks_gray++}
              else if(mit_d100 == 70) {amt_bag_tricks_rust++}
              else if(mit_d100 == 71) {amt_bag_tricks_tan++}
              else if(mit_d100 == 72) {amt_boots_winterlands++}
              else if(mit_d100 == 73) {amt_circlet_blasting++}
              else if(mit_d100 == 74) {amt_deck_illusions++}
              else if(mit_d100 == 75) {amt_eversmoking_bottle++}
              else if(mit_d100 == 76) {amt_eyes_charming++}
              else if(mit_d100 == 77) {amt_eyes_eagle++}
              else if(mit_d100 == 78) {amt_figurine_wondrous_power_silver_raven++}
              else if(mit_d100 == 79) {amt_gem_brightness++}
              else if(mit_d100 == 80) {amt_gloves_missile_snaring++}
              else if(mit_d100 == 81) {amt_gloves_swimming_climbing++}
              else if(mit_d100 == 82) {amt_gloves_thievery++}
              else if(mit_d100 == 83) {amt_headband_intellect++}
              else if(mit_d100 == 84) {amt_helm_telepathy++}
              else if(mit_d100 == 85) {amt_instrument_bards_doss_lute++}
              else if(mit_d100 == 86) {amt_instrument_bards_fochlucan_bandore++}
              else if(mit_d100 == 87) {amt_instrument_bards_mac_fuimidh_cittern++}
              else if(mit_d100 == 88) {amt_medallion_thoughts++}
              else if(mit_d100 == 89) {amt_necklace_adaptation++}
              else if(mit_d100 == 90) {amt_periapt_wound_closure++}
              else if(mit_d100 == 91) {amt_pipes_haunting++}
              else if(mit_d100 == 92) {amt_pipes_sewers++}
              else if(mit_d100 == 93) {amt_ring_jumping++}
              else if(mit_d100 == 94) {amt_ring_mind_shielding++}
              else if(mit_d100 == 95) {amt_ring_warmth++}
              else if(mit_d100 == 96) {amt_ring_water_walking++}
              else if(mit_d100 == 97) {amt_quiver_ehlonna++}
              else if(mit_d100 == 98) {amt_stone_good_luck++}
              else if(mit_d100 == 99) {amt_wind_fan++}
              else if(mit_d100 == 100) {amt_winged_boots++}
          }
          //Display results to GM
          //['name', utility, 'damage type', 'weapon type', 'damage', 'weight', 'properties', 'modifiers']
          for(; amt_weapon_1 > 0; amt_weapon_1--) {
            rand_weapon = choose_weapon("any");
            loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"" + rand_weapon[0]  + " (enchantment +1)\", \"itemweight\": \"" + rand_weapon[5] + "\", \"itemproperties\": \"" + rand_weapon[6] + "\", \"itemmodifiers\": \"" + rand_weapon[7] + "\", \"hasattack\": \"1\"};"
          }
          if(amt_shield_1 > 0) {loot = loot + "{\"itemcount\": \"" + amt_shield_1 + "\", \"itemname\": \"shield (enchantment +1)\", \"itemweight\": \"6\", \"ac\": \"2\"};"}
          if(amt_sentinel_shield > 0) {loot = loot + "{\"itemcount\": \"" + amt_sentinel_shield + "\", \"itemname\": \"sentinel shield\", \"itemweight\": \"6\", \"ac\": \"2\", \"itemcontent\": \"While holding this shield, you have advantage on initiative rolls and Wisdom (Perception) checks. The shield is emblazoned with a symbol of an eye.\"};"}
          if(amt_amulet_proof_against_detection_location > 0) {loot = loot + "{\"itemcount\": \"" + amt_amulet_proof_against_detection_location + "\", \"itemname\": \"amulet of proof against detection and location\", \"itemweight\": \"0.5\", \"itemcontent\": \"While wearing this amulet, you are hidden from divination magic. You can't be targeted by such magic or perceived through magical scrying sensors.\"};"}
          if(amt_boots_elvenkind > 0) {loot = loot + "{\"itemcount\": \"" + amt_boots_elvenkind + "\", \"itemname\": \"boots of elvenkind\", \"itemweight\": \"1\", \"itemcontent\": \" While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.\"};"}
          if(amt_boots_striding_springing > 0) {loot = loot + "{\"itemcount\": \"" + amt_boots_striding_springing + "\", \"itemname\": \"boots of striding and springing\", \"itemweight\": \"1\", \"itemcontent\": \"While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow.\"};"}
          if(amt_bracers_archery > 0) {loot = loot + "{\"itemcount\": \"" + amt_bracers_archery + "\", \"itemname\": \"bracers of archery\", \"itemweight\": \"1\", \"itemcontent\": \" While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.\"};"}
          if(amt_brooch_shielding > 0) {loot = loot + "{\"itemcount\": \"" + amt_brooch_shielding + "\", \"itemname\": \"brooch of shielding\", \"itemweight\": \"0.5\", \"itemcontent\": \"While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the magic missile spell.\"};"}
          if(amt_broom_flying > 0) {loot = loot + "{\"itemcount\": \"" + amt_broom_flying + "\", \"itemname\": \"broom of flying\", \"itemweight\": \"3\", \"itemcontent\": \"This wooden broom, which weighs 3 pounds, functions like a mundane broom until you stand astride it and speak its command word. It then hovers beneath you and can be ridden in the air. It has a flying speed of 50 feet. It can carry up to 400 pounds, but its flying speed becomes 30 feet while carrying over 200 pounds. The broom stops hovering when you land. You can send the broom to travel alone to a destination within 1 mile ofyou ifyou speak the command word, name the location, and are familiar with that place. The broom comes back to you when you speak another command word, provided that the broom is still within 1 mile of you.\"};"}
          if(amt_cloak_elvenkind > 0) {loot = loot + "{\"itemcount\": \"" + amt_cloak_elvenkind + "\", \"itemname\": \"cloak of elvenkind\", \"itemweight\": \"1\", \"itemcontent\": \"While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage. and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you. Pulling the hood up or down requires an action.\"};"}
          if(amt_cloak_protection > 0) {loot = loot + "{\"itemcount\": \"" + amt_cloak_protection + "\", \"itemname\": \"cloak of protection\", \"itemweight\": \"2\", \"ac\": \"2\", \"itemcontent\": \"You gain a +1 bonus to AC and saving throws while you wear this cloak.\"};"}
          if(amt_gauntlets_ogre_power > 0) {loot = loot + "{\"itemcount\": \"" + amt_gauntlets_ogre_power + "\", \"itemname\": \"gauntlets of ogre power\", \"itemweight\": \"4\", \"itemcontent\": \" Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher.\"};"}
          if(amt_hat_disguise > 0) {loot = loot + "{\"itemcount\": \"" + amt_hat_disguise + "\", \"itemname\": \"hat of disguise\", \"itemweight\": \"0\", \"itemcontent\": \"While wearing this hat, you can use an action to cast the disguise selfspell from it at will. The spell ends if the hat is removed.\"};"}
          if(amt_javelin_lightning > 0) {loot = loot + "{\"itemcount\": \"" + amt_javelin_lightning + "\", \"itemname\": \"javelin of lightning\", \"itemweight\": \"2\", \"itemcontent\": \"This javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage. The javelin's property can't be used again until the next dawn. In the meantime, the javelin can still be used as a magic weapon.\", \"itemproperties\": \"Thrown (range 30/120)\", \"itemmodifiers\": \"Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 30/120\", \"hasattack\": \"1\"};"}
          if(amt_pearl_power > 0) {loot = loot + "{\"itemcount\": \"" + amt_pearl_power + "\", \"itemname\": \"pearl of power\", \"itemweight\": \"0\", \"itemcontent\": \"You can use an action to speak this pearl's command word and regain one expended spell slot of up to 3rd level. Once you have used the pearl, it can't be used again until the next dawn.\"};"}
          if(amt_rod_pact_keeper_1 > 0) {loot = loot + "{\"itemcount\": \"" + amt_rod_pact_keeper_1 + "\", \"itemname\": \"rod of the pact keeper (+1)\", \"itemweight\": \"2\", \"itemcontent\": \"While holding this rod, you gain a bonus to spell attack rolls and to the saving throw DCs of your warlock spells. The bonus is determined by the rod's rarity. 1n addition, you can regain one warlock spell slot - an action while holding the rod. You can't use this property again until you finish a long rest.\"};"}
          if(amt_slippers_spider_climbing > 0) {loot = loot + "{\"itemcount\": \"" + amt_slippers_spider_climbing + "\", \"itemname\": \"slippers of spider climbing\", \"itemweight\": \"0.5\", \"itemcontent\": \"While you wear these light shoes, you can move up, down , and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. Howeve- the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil.\"};"}
          if(amt_staff_adder > 0) {loot = loot + "{\"itemcount\": \"" + amt_staff_adder + "\", \"itemname\": \"staff of the adder\", \"itemweight\": \"4\", \"itemcontent\": \"You can use a bonus action to speak this staff's command word and make the head of the staff become that of an animate poisonous snake for 1 minute. By using another bonus action to speak the command word again, you return the staff to its normal inanimate form. You can make a melee attack using the snake head, which has a reach of 5 feet. Your proficiency bonus applies to the attack roll. On a hit, the target takes 1d6 piercing damage and must succeed on a DC 15 Constitution saving throw or take 3d6 poison damage. The snake head can be attacked while it is animate. It has an Armor Class of 15 and 20 hit points. If the head drops to 0 hit points, the staff is destroyed. As long as it's not destroyed, the staff regains all lost hit points when it reverts to its inanimate form.\"};"}
          if(amt_staff_python > 0) {loot = loot + "{\"itemcount\": \"" + amt_staff_python + "\", \"itemname\": \"staff of the python\", \"itemweight\": \"4\", \"itemcontent\": \"You can use an action to speak this staff's command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant constrictor snake (see the Monster Manual for statistics) under your control and acts on its own initiative count. By using a bonus action to speak the command word again, you return the staff to its normal form in a space formerly occupied by the snake. On your turn, you can mentally command the snake if it is within 60 feet of you and you aren't incapacitated. You decide what action the snake takes and where it moves during its next turn, or you can issue it a general command, such as to attack your enemies or guard a location. If the snake is reduced to 0 hit points, it dies and reverts to its staff form. The staff then shatters and is destroyed. If the snake reverts to staff form before losing all its hit points, it regains all of them.\"};"}
          for(; amt_sword_vengeance > 0; amt_sword_vengeance--) {
            rand_weapon = choose_weapon("sword");
            loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"" + rand_weapon[0]  + " of vengeance\", \"itemweight\": \"" + rand_weapon[5] + "\", \"itemproperties\": \"" + rand_weapon[6] + "\", \"itemmodifiers\": \"" + rand_weapon[7] + "\", \"itemcontent\": \"You gain a +1 bonus to attack and damage rolls made with this magic weapon. Curse: This sword is cursed and possessed by a vengeful spirit. Becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the sword, keeping it on your person at all times. While attended to this weapon, you have disadvantage on attack rolls made with weapons other than this one. In addition, while this sword is on your person, you must succeed on a DC 15 Wisdom saving throw whenever you take damage in combat. On a failed save you must attack the creature that damaged you until you drop to 0 hit points or it does, or until you can't reach the creature to make a melee attack against it. You can break the curse in the usual ways. Alternatively, casting banishment on the sword forces the vengeful spirit to leave it. The sword becomes a +1 weapon with no other properties.\", \"hasattack\": \"1\"};"
          }
          if(amt_trident_fish_command > 0) {loot = loot + "{\"itemcount\": \"" + amt_trident_fish_command + "\", \"itemname\": \"trident of fish command\", \"itemweight\": \"4\", \"itemcontent\": \"This trident is a magic weapon. It has 3 charges. While you carry it, you can use an action and expend 1 charge to cast dominate beast (save DC 15) from it on a beast that has an innate swimming speed. The trident regains 1d3 expended charges daily at dawn.\", \"itemproperties\": \"Thrown (range 20/60), versatile (1d8)\", \"itemmodifiers\": \"Item Type: Melee Weapon, Damage: 1d6, Damage Type: piercing, Range: 20/60\", \"hasattack\": \"1\"};"}
          if(amt_wand_magic_missiles > 0) {loot = loot + "{\"itemcount\": \"" + amt_wand_magic_missiles + "\", \"itemname\": \"wand of magic missiles\", \"itemweight\": \"1\", \"itemcontent\": \"This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the magic missile spell from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend. The wand regains ld6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\"};"}
          if(amt_wand_war_mage_1 > 0) {loot = loot + "{\"itemcount\": \"" + amt_wand_war_mage_1 + "\", \"itemname\": \"wand of the war mage (+1)\", \"itemweight\": \"1\", \"itemcontent\": \"While holding this wand, you gain a bonus to spell attack rolls determined by the wand's rarity. In addition, you ignore half cover when making a spell attack.\"};"}
          if(amt_wand_web > 0) {loot = loot + "{\"itemcount\": \"" + amt_wand_web + "\", \"itemname\": \"wand of web\", \"itemweight\": \"1\", \"itemcontent\": \"This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the web spell (save DC 15) from it. The wand regains 1d6 + 1 expended charges daily at dawn. Ifyou expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\"};"}
          for(; amt_weapon_warning > 0; amt_weapon_warning--) {
            rand_weapon = choose_weapon("any");
            loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"" + rand_weapon[0]  + " of warning\", \"itemweight\": \"" + rand_weapon[5] + "\", \"itemproperties\": \"" + rand_weapon[6] + "\", \"itemmodifiers\": \"" + rand_weapon[7] + "\", \"itemcontent\": \"This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can't be surprised, except when incapacitated by something other than nonmagical sleep. The weapon magically awakens you and your companions within range if any of you are sleeping naturally when combat begins.\", \"hasattack\": \"1\"};"
          }
          if(amt_adamantine_chain_mail > 0) {loot = loot + "{\"itemcount\": \"" + amt_adamantine_chain_mail + "\", \"itemname\": \"adamantine chain mail\", \"itemweight\": \"55\", \"ac\": \"16\", \"itemcontent\": \"This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit.\"};"}
          if(amt_adamantine_chain_shirt > 0) {loot = loot + "{\"itemcount\": \"" + amt_adamantine_chain_shirt + "\", \"itemname\": \"adamantine chain shirt\", \"itemweight\": \"20\", \"ac\": \"13\", \"itemcontent\": \"This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit.\"};"}
          if(amt_adamantine_scale_mail > 0) {loot = loot + "{\"itemcount\": \"" + amt_adamantine_scale_mail + "\", \"itemname\": \"adamantine scale mail\", \"itemweight\": \"45\", \"ac\": \"14\", \"itemcontent\": \"This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit.\"};"}
          if(amt_bag_tricks_gray > 0) {loot = loot + "{\"itemcount\": \"" + amt_bag_tricks_gray + "\", \"itemname\": \"gray bag of tricks\", \"itemweight\": \"0.5\", \"itemcontent\": \"This ordinary bag, made from gray cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs 1/2 pound. You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table that corresponds to the bag's color (DMG p.154). See the Monster Manual for the creature's statistics. The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature. Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\"};"}
          if(amt_bag_tricks_rust > 0) {loot = loot + "{\"itemcount\": \"" + amt_bag_tricks_rust + "\", \"itemname\": \"rust bag of tricks\", \"itemweight\": \"0.5\", \"itemcontent\": \"This ordinary bag, made from rust cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs 1/2 pound. You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table that corresponds to the bag's color (DMG p.154). See the Monster Manual for the creature's statistics. The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature. Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\"};"}
          if(amt_bag_tricks_tan > 0) {loot = loot + "{\"itemcount\": \"" + amt_bag_tricks_tan + "\", \"itemname\": \"tan bag of tricks\", \"itemweight\": \"0.5\", \"itemcontent\": \"This ordinary bag, made from tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object. The bag weighs 1/2 pound. You can use an action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling a d8 and consulting the table that corresponds to the bag's color (DMG p.154). See the Monster Manual for the creature's statistics. The creature is friendly to you and your companions, and it acts on your turn. You can use a bonus action to command how the creature moves and what action it takes on its next turn, or to give it general orders, such as to attack your enemies. In the absence of such orders, the creature acts in a fashion appropriate to its nature. Once three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\"};"}
          if(amt_boots_winterlands > 0) {loot = loot + "{\"itemcount\": \"" + amt_boots_winterlands + "\", \"itemname\": \"boots of the winterlands\", \"itemweight\": \"1\", \"itemcontent\": \"These furred boots are snug and feel quite warm. While you wear them, you gain the following benefits: • You have resistance to cold damage. • You ignore difficult terrain created by ice or snow. You can tolerate temperatures as low as -50 degrees Fahrenheit without any additional protection. If you wear heavy clothes, you can tolerate temperatures as low as -100 degrees Fahrenheit.\"};"}
          if(amt_circlet_blasting > 0) {loot = loot + "{\"itemcount\": \"" + amt_circlet_blasting + "\", \"itemname\": \"circlet of blasting\", \"itemweight\": \"0.5\", \"itemcontent\": \"While wearing this circlet, you can use an action to cast the scorching ray spell with it. When you make the spell's attacks, you do so with an attack bonus of +5'. The circlet can't be used this way again until the next dawn.\"};"}
          for(card_amount = 35 - RandomInt(20); amt_deck_illusions > 0; 
              amt_deck_illusions--, card_amount = 35 - RandomInt(20)) {
              loot = loot + "{\"itemcount\": \"1\", \"itemname\": \"deck of illusions with " + card_amount + " cards\", \"itemweight\": \"0.5\", \"itemcontent\": \"This box contains a set of parchment cards. The magic of the deck functions only if cards are drawn at random (you can use an altered deck of playing cards to simulate the deck). You can use an action to draw a card at random from the deck and throw it to the ground at a point within 30 feet of you. An illusion of one or more creatures forms over the thrown card and remains until dispelled. An illusory creature appears real, of the appropriate size, and behaves as if it were a real creature (as presented in the Monster Manual), except that it can do no harm. While you are within 120 feet of the illusory creature and can see it, you can use an action to move it magically anywhere within 30 feet of its card. Any physical interaction with the illusory creature reveals it to be an illusion, because objects pass through it. Someone who uses an action to visually inspect the creature identifies it as illusory with a successful DC 15 Intelligence (Investigation) check. The creature then appears translucent. The illusion lasts until its card is moved or the illusion is dispelled. When the illusion ends, the image on its card disappears, and that card can't be used again. (Table on DMG p.162)\"};"
          }
          if(amt_eversmoking_bottle > 0) {loot = loot + "" + amt_eversmoking_bottle + " eversmoking bottle(s);"}
          if(amt_eyes_charming > 0) {loot = loot + "" + amt_eyes_charming + " eyes of charming;"}
          if(amt_eyes_eagle > 0) {loot = loot + "" + amt_eyes_eagle + " eyes of the eagle;"}
          if(amt_figurine_wondrous_power_silver_raven > 0) {loot = loot + "" + amt_figurine_wondrous_power_silver_raven + " silver raven figurine(s) of wondrous power;"}
          if(amt_gem_brightness > 0) {loot = loot + "" + amt_gem_brightness + " gem(s) of brightness;"}
          if(amt_gloves_missile_snaring > 0) {loot = loot + "" + amt_gloves_missile_snaring + " gloves of missile snaring;"}
          if(amt_gloves_swimming_climbing > 0) {loot = loot + "" + amt_gloves_swimming_climbing + " gloves of swimming and climbing;"}
          if(amt_gloves_thievery > 0) {loot = loot + "" + amt_gloves_thievery + " gloves of thievery;"}
          if(amt_headband_intellect > 0) {loot = loot + "" + amt_headband_intellect + " headband(s) of intellect;"}
          if(amt_helm_telepathy > 0) {loot = loot + "" + amt_helm_telepathy + " helm(s) of telepathy;"}
          if(amt_instrument_bards_doss_lute > 0) {loot = loot + "" + amt_instrument_bards_doss_lute + " instrument(s) of the bards (Doss lute);"}
          if(amt_instrument_bards_fochlucan_bandore > 0) {loot = loot + "" + amt_instrument_bards_fochlucan_bandore + " instrument(s) of the bards (Fochlucan bandore);"}
          if(amt_instrument_bards_mac_fuimidh_cittern > 0) {loot = loot + "" + amt_instrument_bards_mac_fuimidh_cittern + " instrument(s) of the bards (Mac-Fuirmidh cittern);"}
          if(amt_medallion_thoughts > 0) {loot = loot + "" + amt_medallion_thoughts + " medallion(s) of thoughts;"}
          if(amt_necklace_adaptation > 0) {loot = loot + "" + amt_necklace_adaptation + " necklace(s) of adaptation;"}
          if(amt_periapt_wound_closure > 0) {loot = loot + "" + amt_periapt_wound_closure + " periapt(s) of wound closure;"}
          if(amt_pipes_haunting > 0) {loot = loot + "" + amt_pipes_haunting + " pipes of haunting;"}
          if(amt_pipes_sewers > 0) {loot = loot + "" + amt_pipes_sewers + " pipes of the sewers;"}
          if(amt_ring_jumping > 0) {loot = loot + "" + amt_ring_jumping + " ring(s) of jumping;"}
          if(amt_ring_mind_shielding > 0) {loot = loot + "" + amt_ring_mind_shielding + " ring(s) of mind shielding;"}
          if(amt_ring_warmth > 0) {loot = loot + "" + amt_ring_warmth + " ring(s) of warmth;"}
          if(amt_ring_water_walking > 0) {loot = loot + "" + amt_ring_water_walking + " ring(s) of water walking;"}
          if(amt_quiver_ehlonna > 0) {loot = loot + "" + amt_quiver_ehlonna + " quiver(s) of Ehlonna;"}
          if(amt_stone_good_luck > 0) {loot = loot + "" + amt_stone_good_luck + " stone(s) of good luck;"}
          if(amt_wind_fan > 0) {loot = loot + "" + amt_wind_fan + " wind fan(s);"}
          if(amt_winged_boots > 0) {loot = loot + "" + amt_winged_boots + " winged boots;"}
      }
      
      //Magic Item Table G
      if(amt_mit_g > 0) {
          
          // sendChat(msg.who, "/w gm " + amt_mit_g + " magical items (table G)")
          
              /* 01-11 */ amt_weapon_2 = 0
              /* 12-14 */ amt_figurine_wondrous_power_g = 0
              /* 15 */ amt_adamantine_armor_breastplate = 0
              /* 16 */ amt_adamantine_armor_splint = 0
              /* 17 */ amt_amulet_health = 0
              /* 18 */ amt_armor_vulnerability = 0
              /* 19 */ amt_arrow_catching_shield = 0
              /* 20 */ amt_belt_dwarvenkind = 0
              /* 21 */ amt_belt_hill_giant_strength = 0
              /* 22 */ amt_berserker_axe = 0
              /* 23 */ amt_boots_levitation = 0
              /* 24 */ amt_boots_speed = 0
              /* 25 */ amt_bowl_commanding_water_elements = 0
              /* 26 */ amt_bracers_defense = 0
              /* 27 */ amt_brazier_commanding_fire_elementals = 0
              /* 28 */ amt_cape_mountebank = 0
              /* 29 */ amt_censer_controlling_air_elementals = 0
              /* 30 */ amt_chain_mail_1 = 0
              /* 31 */ amt_armor_resistance_chain_mail = 0
              /* 32 */ amt_chain_shirt_1 = 0
              /* 33 */ amt_armor_resistance_chain_shirt = 0
              /* 34 */ amt_cloak_displacement = 0
              /* 35 */ amt_cloak_bat = 0
              /* 36 */ amt_cube_force = 0
              /* 37 */ amt_daerns_instant_fortress = 0
              /* 38 */ amt_dagger_venom = 0
              /* 39 */ amt_dimensional_shackles = 0
              /* 40 */ amt_dragon_slayer = 0
              /* 41 */ amt_elven_chain = 0
              /* 42 */ amt_flame_tongue = 0
              /* 43 */ amt_gem_seeing = 0
              /* 44 */ amt_giant_slayer = 0
              /* 45 */ amt_glamoured_studded_leather = 0
              /* 46 */ amt_helm_teleportation = 0
              /* 47 */ amt_horn_blasting = 0
              /* 48 */ amt_horn_valhalla_g = 0
              /* 49 */ amt_instrument_bards_canaith_mandolin = 0
              /* 50 */ amt_instrument_bards_cli_lyre = 0
              /* 51 */ amt_ioun_stone_awareness = 0
              /* 52 */ amt_ioun_stone_protection = 0
              /* 53 */ amt_ioun_stone_reserve = 0
              /* 54 */ amt_ioun_stone_sustenance = 0
              /* 55 */ amt_iron_bands_bilarro = 0
              /* 56 */ amt_leather_armor_1 = 0
              /* 57 */ amt_armor_resistance_leather = 0
              /* 58 */ amt_mace_disruption = 0
              /* 59 */ amt_mace_smiting = 0
              /* 60 */ amt_mace_terror = 0
              /* 61 */ amt_mantle_spell_resistance = 0
              /* 62 */ amt_necklace_prayer_beads = 0
              /* 63 */ amt_periapt_proof_against_poison = 0
              /* 64 */ amt_ring_animal_influence = 0
              /* 65 */ amt_ring_evasion = 0
              /* 66 */ amt_ring_feather_falling = 0
              /* 67 */ amt_ring_free_action = 0
              /* 68 */ amt_ring_protection = 0
              /* 69 */ amt_ring_resistance = 0
              /* 70 */ amt_ring_spell_storing = 0
              /* 71 */ amt_ring_ram = 0
              /* 72 */ amt_ring_xray_vision = 0
              /* 73 */ amt_robe_eyes = 0
              /* 74 */ amt_rod_rulership = 0
              /* 75 */ amt_rod_pact_keeper_2 = 0
              /* 76 */ amt_rope_entanglement = 0
              /* 77 */ amt_scale_mail_1 = 0
              /* 78 */ amt_armor_resistance_scale_mail = 0
              /* 79 */ amt_shield_2 = 0
              /* 80 */ amt_shield_missile_attraction = 0
              /* 81 */ amt_staff_charming = 0
              /* 82 */ amt_staff_healing = 0
              /* 83 */ amt_staff_swarming_insects = 0
              /* 84 */ amt_staff_woodlands = 0
              /* 85 */ amt_staff_withering = 0
              /* 86 */ amt_stone_controlling_earth_elementals = 0
              /* 87 */ amt_sun_blade = 0
              /* 88 */ amt_sword_life_stealing = 0
              /* 89 */ amt_sword_wounding = 0
              /* 90 */ amt_tentacle_rod = 0
              /* 91 */ amt_vicious_weapon = 0
              /* 92 */ amt_wand_binding = 0
              /* 93 */ amt_wand_enemy_detection = 0
              /* 94 */ amt_wand_fear = 0
              /* 95 */ amt_wand_fireballs = 0
              /* 96 */ amt_wand_lightning_bolts = 0
              /* 97 */ amt_wand_paralysis = 0
              /* 98 */ amt_wand_war_mage_2 = 0
              /* 99 */ amt_wand_wonder = 0
              /* 100 */ amt_wings_flying = 0
          
          for(mit_d100 = RandomInt(100); amt_mit_g > 0; amt_mit_g--, mit_d100 = RandomInt(100)) {
              // sendChat(msg.who, "/w gm Rolled a " + mit_d100)
              if(mit_d100 < 12) {amt_weapon_2++}
              else if(mit_d100 < 15) {amt_figurine_wondrous_power_g++}
              else if(mit_d100 == 15) {amt_adamantine_armor_breastplate++}
              else if(mit_d100 == 16) {amt_adamantine_armor_splint++}
              else if(mit_d100 == 17) {amt_amulet_health++}
              else if(mit_d100 == 18) {amt_armor_vulnerability++}
              else if(mit_d100 == 19) {amt_arrow_catching_shield++}
              else if(mit_d100 == 20) {amt_belt_dwarvenkind++}
              else if(mit_d100 == 21) {amt_belt_hill_giant_strength++}
              else if(mit_d100 == 22) {amt_berserker_axe++}
              else if(mit_d100 == 23) {amt_boots_levitation++}
              else if(mit_d100 == 24) {amt_boots_speed++}
              else if(mit_d100 == 25) {amt_bowl_commanding_water_elements++}
              else if(mit_d100 == 26) {amt_bracers_defense++}
              else if(mit_d100 == 27) {amt_brazier_commanding_fire_elementals++}
              else if(mit_d100 == 28) {amt_cape_mountebank++}
              else if(mit_d100 == 29) {amt_censer_controlling_air_elementals++}
              else if(mit_d100 == 30) {amt_chain_mail_1++}
              else if(mit_d100 == 31) {amt_armor_resistance_chain_mail++}
              else if(mit_d100 == 32) {amt_chain_shirt_1++}
              else if(mit_d100 == 33) {amt_armor_resistance_chain_shirt++}
              else if(mit_d100 == 34) {amt_cloak_displacement++}
              else if(mit_d100 == 35) {amt_cloak_bat++}
              else if(mit_d100 == 36) {amt_cube_force++}
              else if(mit_d100 == 37) {amt_daerns_instant_fortress++}
              else if(mit_d100 == 38) {amt_dagger_venom++}
              else if(mit_d100 == 39) {amt_dimensional_shackles++}
              else if(mit_d100 == 40) {amt_dragon_slayer++}
              else if(mit_d100 == 41) {amt_elven_chain++}
              else if(mit_d100 == 42) {amt_flame_tongue++}
              else if(mit_d100 == 43) {amt_gem_seeing++}
              else if(mit_d100 == 44) {amt_giant_slayer++}
              else if(mit_d100 == 45) {amt_glamoured_studded_leather++}
              else if(mit_d100 == 46) {amt_helm_teleportation++}
              else if(mit_d100 == 47) {amt_horn_blasting++}
              else if(mit_d100 == 48) {amt_horn_valhalla_g++}
              else if(mit_d100 == 49) {amt_instrument_bards_canaith_mandolin++}
              else if(mit_d100 == 50) {amt_instrument_bards_cli_lyre++}
              else if(mit_d100 == 51) {amt_ioun_stone_awareness++}
              else if(mit_d100 == 52) {amt_ioun_stone_protection++}
              else if(mit_d100 == 53) {amt_ioun_stone_reserve++}
              else if(mit_d100 == 54) {amt_ioun_stone_sustenance++}
              else if(mit_d100 == 55) {amt_iron_bands_bilarro++}
              else if(mit_d100 == 56) {amt_leather_armor_1++}
              else if(mit_d100 == 57) {amt_armor_resistance_leather++}
              else if(mit_d100 == 58) {amt_mace_disruption++}
              else if(mit_d100 == 59) {amt_mace_smiting++}
              else if(mit_d100 == 60) {amt_mace_terror++}
              else if(mit_d100 == 61) {amt_mantle_spell_resistance++}
              else if(mit_d100 == 62) {amt_necklace_prayer_beads++}
              else if(mit_d100 == 63) {amt_periapt_proof_against_poison++}
              else if(mit_d100 == 64) {amt_ring_animal_influence++}
              else if(mit_d100 == 65) {amt_ring_evasion++}
              else if(mit_d100 == 66) {amt_ring_feather_falling++}
              else if(mit_d100 == 67) {amt_ring_free_action++}
              else if(mit_d100 == 68) {amt_ring_protection++}
              else if(mit_d100 == 69) {amt_ring_resistance++}
              else if(mit_d100 == 70) {amt_ring_spell_storing++}
              else if(mit_d100 == 71) {amt_ring_ram++}
              else if(mit_d100 == 72) {amt_ring_xray_vision++}
              else if(mit_d100 == 73) {amt_robe_eyes++}
              else if(mit_d100 == 74) {amt_rod_rulership++}
              else if(mit_d100 == 75) {amt_rod_pact_keeper_2++}
              else if(mit_d100 == 76) {amt_rope_entanglement++}
              else if(mit_d100 == 77) {amt_scale_mail_1++}
              else if(mit_d100 == 78) {amt_armor_resistance_scale_mail++}
              else if(mit_d100 == 79) {amt_shield_2++}
              else if(mit_d100 == 80) {amt_shield_missile_attraction++}
              else if(mit_d100 == 81) {amt_staff_charming++}
              else if(mit_d100 == 82) {amt_staff_healing++}
              else if(mit_d100 == 83) {amt_staff_swarming_insects++}
              else if(mit_d100 == 84) {amt_staff_woodlands++}
              else if(mit_d100 == 85) {amt_staff_withering++}
              else if(mit_d100 == 86) {amt_stone_controlling_earth_elementals++}
              else if(mit_d100 == 87) {amt_sun_blade++}
              else if(mit_d100 == 88) {amt_sword_life_stealing++}
              else if(mit_d100 == 89) {amt_sword_wounding++}
              else if(mit_d100 == 90) {amt_tentacle_rod++}
              else if(mit_d100 == 91) {amt_vicious_weapon++}
              else if(mit_d100 == 92) {amt_wand_binding++}
              else if(mit_d100 == 93) {amt_wand_enemy_detection++}
              else if(mit_d100 == 94) {amt_wand_fear++}
              else if(mit_d100 == 95) {amt_wand_fireballs++}
              else if(mit_d100 == 96) {amt_wand_lightning_bolts++}
              else if(mit_d100 == 97) {amt_wand_paralysis++}
              else if(mit_d100 == 98) {amt_wand_war_mage_2++}
              else if(mit_d100 == 99) {amt_wand_wonder++}
              else if(mit_d100 == 100) {amt_wings_flying++}
          }
          
          for(; amt_weapon_2 > 0; amt_weapon_2--) {loot = loot + "" + "1 " + choose_weapon("any") + " (enchantment +2);"}
          for(figurine_roll = RandomInt(8); amt_figurine_wondrous_power_g > 0; amt_figurine_wondrous_power_g--, figurine_roll = RandomInt(8)) {
              if(figurine_roll == 1) {figurine = 'bronze griffon'}
              if(figurine_roll == 2) {figurine = 'ebony fly'}
              if(figurine_roll == 3) {figurine = 'golden lion'}
              if(figurine_roll == 4) {figurine = 'ivory goat'}
              if(figurine_roll == 5) {figurine = 'marble elephant'}
              if(figurine_roll == 6 || figurine_roll == 7) {figurine = 'onyx dog'}
              if(figurine_roll == 8) {figurine = 'serpentine owl'}
              loot = loot + "" + figurine + " figurine(s) of wondrous power;"
          }
          if(amt_adamantine_armor_breastplate > 0) {loot = loot + "" + amt_adamantine_armor_breastplate + " adamantine breastplate(s);"}
          if(amt_adamantine_armor_splint > 0) {loot = loot + "" + amt_adamantine_armor_splint + " adamantine splint armor(s);"}
          if(amt_amulet_health > 0) {loot = loot + "" + amt_amulet_health + " amulet(s) of health;"}
          for(resistance_roll = RandomInt(3); amt_armor_vulnerability > 0; amt_armor_vulnerability--, resistance_roll = RandomInt(3)) {
              if(figurine_roll == 1) {resistance = 'slashing'}
              if(figurine_roll == 2) {resistance = 'piercing'}
              if(figurine_roll == 3) {resistance = 'bludgeoning'}
              loot = loot + "" + "Plate armor of vulnerability (resistant to " + resistance + ");"
          }

          if(amt_arrow_catching_shield > 0) {loot = loot + "" + aamt_rrow_catching_shield + " arrow catching shield(s);"}
          if(amt_belt_dwarvenkind > 0) {loot = loot + "" + amt_belt_dwarvenkind + " belt(s) of dwarvenkind;"}
          if(amt_belt_hill_giant_strength > 0) {loot = loot + "" + amt_belt_hill_giant_strength + " belt(s) of hill giant strength;"}
          for(; amt_berserker_axe > 0; amt_berserker_axe--) {loot = loot + "" + "1 berserker " + choose_weapon("axe") + ";"}
          if(amt_boots_levitation > 0) {loot = loot + "" + amt_boots_levitation + " boots of levitation;"}
          if(amt_boots_speed > 0) {loot = loot + "" + amt_boots_speed + " boots of speed;"}
          if(amt_bowl_commanding_water_elements > 0) {loot = loot + "" + amt_bowl_commanding_water_elements + " bowl(s) of commanding water elements;"}
          if(amt_bracers_defense > 0) {loot = loot + "" + amt_bracers_defense + " bracers of defense;"}
          if(amt_brazier_commanding_fire_elementals > 0) {loot = loot + "" + amt_brazier_commanding_fire_elementals + " brazier(s) of commanding fire elementals;"}
          if(amt_cape_mountebank > 0) {loot = loot + "" + amt_cape_mountebank + " cape(s) of the mounteback;"}
          if(amt_censer_controlling_air_elementals > 0) {loot = loot + "" + amt_censer_controlling_air_elementals + " censer(s) of controlling air elementals;"}
          if(amt_chain_mail_1 > 0) {loot = loot + "" + amt_chain_mail_1 + " chain mail(s) (enchantment +1);"}
          for(;amt_armor_resistance_chain_mail > 0; amt_armor_resistance_chain_mail--) {loot = loot + "" + "1 chain mail of " + resistance_type() + " resistance;"}
          if(amt_chain_shirt_1 > 0) {loot = loot + "" + amt_chain_shirt_1 + " chain shirt(s) (enchantment +1);"}
          for(;amt_armor_resistance_chain_shirt > 0; amt_armor_resistance_chain_shirt--) {loot = loot + "" + "1 chain shirt of " + resistance_type() + " resistance;"}
          if(amt_cloak_displacement > 0) {loot = loot + "" + amt_cloak_displacement + " cloak(s) of displacement;"}
          if(amt_cloak_bat > 0) {loot = loot + "" + amt_cloak_bat + " cloak(s) of the bat;"}
          if(amt_cube_force > 0) {loot = loot + "" + amt_cube_force + " cube(s) of force;"}
          if(amt_daerns_instant_fortress > 0) {loot = loot + "" + amt_daerns_instant_fortress + " Daern's instant fortress(es);"}
          if(amt_dagger_venom > 0) {loot = loot + "" + amt_dagger_venom + " dagger(s) of venom;"}
          if(amt_dimensional_shackles > 0) {loot = loot + "" + amt_dimensional_shackles + " dimensional shackles;"}
          for(;amt_dragon_slayer > 0; amt_dragon_slayer--) {loot = loot + "" + "1 dragon slayer " + choose_weapon("sword") + ";"}
          if(amt_elven_chain > 0) {loot = loot + "" + amt_elven_chain + " Elven chain armor;"}
          for(;amt_flame_tongue > 0; amt_flame_tongue--) {loot = loot + "" + "1 flame tongue " + choose_weapon("sword") + ";"}
          if(amt_gem_seeing > 0) {loot = loot + "" + amt_gem_seeing + " gem(s) of seeing;"}
          for(giant_slayer_roll = RandomInt(2); amt_giant_slayer > 0; amt_giant_slayer--, giant_slayer_roll = RandomInt(2)) {
              if(giant_slayer_roll == 1) {loot = loot + "" + "1 giant slayer " + choose_weapon("sword") + ";"}
              if(giant_slayer_roll == 2) {loot = loot + "" + "1 giant slayer " + choose_weapon("axe") + ";"}
          }

          if(amt_glamoured_studded_leather > 0) {loot = loot + "" + amt_glamoured_studded_leather + " glamoured studded leather armor;"}
          if(amt_helm_teleportation > 0) {loot = loot + "" + amt_helm_teleportation + " helm of teleportation;"}
          if(amt_horn_blasting > 0) {loot = loot + "" + amt_horn_blasting + " horn of blasting;"}
          for(amt_horn_valhalla_g_roll = RandomInt(75); amt_horn_valhalla_g > 0; amt_horn_valhalla_g--, amt_horn_valhalla_g_roll = RandomInt(75)) {
              if(amt_horn_valhalla_g_roll < 41) {horn_valhalla_type = 'silver'}
              else if(amt_horn_valhalla_g_roll < 76) {horn_valhalla_type = 'brass'}
              loot = loot + "" + "1 " + horn_valhalla_type + " horn of Valhalla;"
          }
          if(amt_instrument_bards_canaith_mandolin > 0) {loot = loot + "" + amt_instrument_bards_canaith_mandolin + " instrument of the bards (Canaith mandolin);"}
          if(amt_instrument_bards_cli_lyre > 0) {loot = loot + "" + amt_instrument_bards_cli_lyre + " instrument of the bards (Cli lyre);"}
          if(amt_ioun_stone_awareness > 0) {loot = loot + "" + amt_ioun_stone_awareness + " Ioun stone of awareness;"}
          if(amt_ioun_stone_protection > 0) {loot = loot + "" + amt_ioun_stone_protection + " Ioun stone of protection;"}
          for(;amt_ioun_stone_reserve > 0; amt_ioun_stone_reserve--) {
              for(isr_used_levels = RandomInt(4) - 1, isr_current_spell_number = -1, isr_spells_inside = [], isr_spells_inside_lvl = [];
                isr_used_levels > 0; isr_used_levels = isr_used_levels - isr_spells_inside_lvl[isr_current_spell_number]) {
                  isr_chosen_spell_level = RandomInt(isr_used_levels)
                  isr_current_spell_number++
                  if(isr_chosen_spell_level == 3) {
                      isr_spells_inside[isr_current_spell_number] = spells_3[Math.floor(Math.random() * spells_3.length)]
                      isr_spells_inside_lvl[isr_current_spell_number] = 3
                  }
                  if(isr_chosen_spell_level == 2) {
                      isr_spells_inside[isr_current_spell_number] = spells_2[Math.floor(Math.random() * spells_2.length)]
                      if(isr_used_levels > 2) {isr_spells_inside_lvl[isr_current_spell_number] = RandomInt(2) + 1}
                      else {isr_spells_inside_lvl[isr_current_spell_number] = 2}
                  }
                  if(isr_chosen_spell_level == 1) {
                      isr_spells_inside[isr_current_spell_number] = spells_1[Math.floor(Math.random() * spells_1.length)]
                      isr_spells_inside_lvl[isr_current_spell_number] = RandomInt(isr_used_levels)
                  }
              }

              if(isr_current_spell_number == 0) {loot = loot + "" + "1 Ioun stone of reserve containing " 
                  + isr_spells_inside[0] + " (lvl " + isr_spells_inside_lvl[0] + ");"}
              else if(isr_current_spell_number == 1) {loot = loot + "" + "1 Ioun stone of reserve containing " 
                  + isr_spells_inside[0] + " (lvl " + isr_spells_inside_lvl[0] + ")" + " and " 
                  + isr_spells_inside[1] + " (lvl " + isr_spells_inside_lvl[1] + ");"}
              else if(isr_current_spell_number == 2) {loot = loot + "" + "1 Ioun stone of reserve containing " 
                  + isr_spells_inside[0] + " (lvl " + isr_spells_inside_lvl[0] + ")" + ", " 
                  + isr_spells_inside[1] + " (lvl " + isr_spells_inside_lvl[1] + ")" + " and " 
                  + isr_spells_inside[2] + " (lvl " + isr_spells_inside_lvl[2] + ");"}
              else loot = loot + "" + "1 Ioun stone of reserve (empty);"
          }
          if(amt_ioun_stone_sustenance > 0) {loot = loot + "" + amt_ioun_stone_sustenance + " Ioun stone of sustenance;"}
          if(amt_iron_bands_bilarro > 0) {loot = loot + "" + amt_iron_bands_bilarro + " iron bands of Bilarro;"}
          if(amt_leather_armor_1 > 0) {loot = loot + "" + amt_leather_armor_1 + " leather armor (enchantment +1);"}
          for(;amt_armor_resistance_leather > 0; amt_armor_resistance_leather--) {"1 leather armor of " + resistance_type() + " resistance;"}
          if(amt_mace_disruption > 0) {loot = loot + "" + amt_mace_disruption + " mace of disruption;"}
          if(amt_mace_smiting > 0) {loot = loot + "" + amt_mace_smiting + " mace of smiting;"}
          if(amt_mace_terror > 0) {loot = loot + "" + amt_mace_terror + " mace of terror;"}
          if(amt_mantle_spell_resistance > 0) {loot = loot + "" + amt_mantle_spell_resistance + " mantle of spell resistance;"}


          for(;amt_necklace_prayer_beads > 0; amt_necklace_prayer_beads--) {
              amt_beads = RandomInt(4) + 2
              amt_bead_blessing = 0; amt_bead_curing = 0; amt_bead_favor = 0; amt_bead_smiting = 0; amt_bead_summons = 0; amt_bead_wind_walking = 0
              for(; amt_beads > 0; amt_beads--) {
                  bead_roll = RandomInt(20)
                  if(bead_roll < 7) {amt_bead_blessing++}
                  else if(bead_roll < 13) {amt_bead_curing++}
                  else if(bead_roll < 17) {amt_bead_favor++}
                  else if(bead_roll < 19) {amt_bead_smiting++}
                  else if(bead_roll == 19) {amt_bead_summons++}
                  else if(bead_roll == 20) {amt_bead_wind_walking++}
              }
              loot = loot + "" + "1 necklace of prayer beads with the following beads:"
              if(amt_bead_blessing > 0) {loot = loot + "" + amt_bead_blessing + " beads of blessing"}
              if(amt_bead_curing > 0) {loot = loot + "" + amt_bead_curing + " beads of curing"}
              if(amt_bead_favor > 0) {loot = loot + "" + amt_bead_favor + " beads of favor"}
              if(amt_bead_smiting > 0) {loot = loot + "" + amt_bead_smiting + " beads of smiting"}
              if(amt_bead_summons > 0) {loot = loot + "" + amt_bead_summons + " beads of summons"}
              if(amt_bead_wind_walking > 0) {loot = loot + "" + amt_bead_wind_walking + " beads of wind walking"}
              loot = loot + ";"
          }
          if(amt_periapt_proof_against_poison > 0) {loot = loot + "" + amt_periapt_proof_against_poison + " periapt(s) of proof against poison;"}
          if(amt_ring_animal_influence > 0) {loot = loot + "" + amt_ring_animal_influence + " ring(s) of animal influence;"}
          if(amt_ring_evasion > 0) {loot = loot + "" + amt_ring_evasion + " ring(s) of evasion;"}
          if(amt_ring_feather_falling > 0) {loot = loot + "" + amt_ring_feather_falling + " ring(s) of feather falling;"}
          if(amt_ring_free_action > 0) {loot = loot + "" + amt_ring_free_action + " ring(s) of free action;"}
          if(amt_ring_protection > 0) {loot = loot + "" + amt_ring_protection + " ring(s) of protection;"}
          for(;amt_ring_resistance > 0; amt_ring_resistance--) {loot = loot + "" + "1 ring(s) of resistance to " + resistance_type() + ";"}
          for(;amt_ring_spell_storing > 0; amt_ring_spell_storing--) {
              for(rss_used_levels = RandomInt(6) - 1, rss_current_spell_number = -1, rss_spells_inside = [], rss_spells_inside_lvl = [];
                rss_used_levels > 0; rss_used_levels = rss_used_levels - rss_spells_inside_lvl[rss_current_spell_number]) {
                  rss_chosen_spell_level = RandomInt(rss_used_levels)
                  rss_current_spell_number++
                  if(rss_chosen_spell_level == 5) {
                      rss_spells_inside[rss_current_spell_number] = spells_5[Math.floor(Math.random() * spells_5.length)]
                      rss_spells_inside_lvl[rss_current_spell_number] = 5
                  }
                  if(rss_chosen_spell_level == 4) {
                      rss_spells_inside[rss_current_spell_number] = spells_4[Math.floor(Math.random() * spells_4.length)]
                      if(rss_used_levels == 5) {rss_spells_inside_lvl[rss_current_spell_number] = RandomInt(2) + 3}
                      else {rss_spells_inside_lvl[rss_current_spell_number] = 4}
                  }
                  if(rss_chosen_spell_level == 3) {
                      rss_spells_inside[rss_current_spell_number] = spells_3[Math.floor(Math.random() * spells_3.length)]
                      if(rss_used_levels == 5) {rss_spells_inside_lvl[rss_current_spell_number] = RandomInt(3) + 2}
                      if(rss_used_levels == 4) {rss_spells_inside_lvl[rss_current_spell_number] = RandomInt(2) + 2}
                      else {rss_spells_inside_lvl[rss_current_spell_number] = 3}
                  }
                  if(rss_chosen_spell_level == 2) {
                      rss_spells_inside[rss_current_spell_number] = spells_2[Math.floor(Math.random() * spells_2.length)]
                      if(rss_used_levels == 5) {rss_spells_inside_lvl[rss_current_spell_number] = RandomInt(4) + 1}
                      if(rss_used_levels == 4) {rss_spells_inside_lvl[rss_current_spell_number] = RandomInt(3) + 1}
                      if(rss_used_levels == 3) {rss_spells_inside_lvl[rss_current_spell_number] = RandomInt(2) + 1}
                      else {rss_spells_inside_lvl[rss_current_spell_number] = 2}
                  }
                  if(rss_chosen_spell_level == 1) {
                      rss_spells_inside[rss_current_spell_number] = spells_1[Math.floor(Math.random() * spells_1.length)]
                      rss_spells_inside_lvl[rss_current_spell_number] = RandomInt(rss_used_levels)
                  }
              }
              if(rss_current_spell_number == 0) {loot = loot + "" + "1 ring of spell storing containing " 
                      + rss_spells_inside[0] + " (lvl " + rss_spells_inside_lvl[0] + ");"}
              else if(rss_current_spell_number == 1) {loot = loot + "" + "1 ring of spell storing containing " 
                      + rss_spells_inside[0] + " (lvl " + rss_spells_inside_lvl[0] + ")" + " and " 
                      + rss_spells_inside[1] + " (lvl " + rss_spells_inside_lvl[1] + ");"}
              else if(rss_current_spell_number == 2) {loot = loot + "" + "1 ring of spell storing containing " 
                      + rss_spells_inside[0] + " (lvl " + rss_spells_inside_lvl[0] + ")" + ", " 
                      + rss_spells_inside[1] + " (lvl " + rss_spells_inside_lvl[1] + ")" + " and " 
                      + rss_spells_inside[2] + " (lvl " + rss_spells_inside_lvl[2] + ");"}
              else if(rss_current_spell_number == 3) {loot = loot + "" + "1 ring of spell storing containing " 
                      + rss_spells_inside[0] + " (lvl " + rss_spells_inside_lvl[0] + ")" + ", " 
                      + rss_spells_inside[1] + " (lvl " + rss_spells_inside_lvl[1] + ")" + ", "  
                      + rss_spells_inside[2] + " (lvl " + rss_spells_inside_lvl[2] + ")" + " and "
                      + rss_spells_inside[3] + " (lvl " + rss_spells_inside_lvl[3] + ");"}
              else if(rss_current_spell_number == 4) {loot = loot + "" + "1 ring of spell storing containing " 
                      + rss_spells_inside[0] + " (lvl " + rss_spells_inside_lvl[0] + ")" + ", " 
                      + rss_spells_inside[1] + " (lvl " + rss_spells_inside_lvl[1] + ")" + ", "
                      + rss_spells_inside[2] + " (lvl " + rss_spells_inside_lvl[2] + ")" + ", "
                      + rss_spells_inside[3] + " (lvl " + rss_spells_inside_lvl[3] + ")" + " and "
                      + rss_spells_inside[4] + " (lvl " + rss_spells_inside_lvl[4] + ");"}
              else loot = loot + "" + "1 ring of spell storing (empty);"
          }        
          if(amt_ring_ram > 0) {loot = loot + "" + amt_ring_ram + " ring(s) of the ram;"}
          if(amt_ring_xray_vision > 0) {loot = loot + "" + amt_ring_xray_vision + " ring(s) of x-ray vision;"}
          if(amt_robe_eyes > 0) {loot = loot + "" + amt_robe_eyes + " robe(s) of eyes;"}
          if(amt_rod_rulership > 0) {loot = loot + "" + amt_rod_rulership + " rod(s) of rulership;"}
          if(amt_rod_pact_keeper_2 > 0) {loot = loot + "" + amt_rod_pact_keeper_2 + " rod(s) of the pactkeeper +2;"}
          if(amt_rope_entanglement > 0) {loot = loot + "" + amt_rope_entanglement + " rope(s) of entanglement;"}
          if(amt_scale_mail_1 > 0) {loot = loot + "" + amt_scale_mail_1 + " scale mail (enchantment +1);"}
          for(;amt_armor_resistance_scale_mail > 0; amt_armor_resistance_scale_mail--) {loot = loot + "" + "1 scale mail of " + resistance_type() + " resistance;"}
          if(amt_shield_2 > 0) {loot = loot + "" + amt_shield_2 + " shield (enchantment +2);"}
          if(amt_shield_missile_attraction > 0) {loot = loot + "" + amt_shield_missile_attraction + " shield of missile attraction;"}
          if(amt_staff_charming > 0) {loot = loot + "" + amt_staff_charming + " staff(ves) of charming;"}
          if(amt_staff_healing > 0) {loot = loot + "" + amt_staff_healing + " staff(ves) of healing;"}
          if(amt_staff_swarming_insects > 0) {loot = loot + "" + amt_staff_swarming_insects + " staff(ves) of swarming insects;"}
          if(amt_staff_woodlands > 0) {loot = loot + "" + amt_staff_woodlands + " staff(ves) of the woodlands;"}
          if(amt_staff_withering > 0) {loot = loot + "" + amt_staff_withering + " staff(ves) of withering;"}
          if(amt_stone_controlling_earth_elementals > 0) {loot = loot + "" + amt_stone_controlling_earth_elementals + " stone(s) of controlling earth elementals;"}
          if(amt_sun_blade > 0) {loot = loot + "" + amt_sun_blade + " sun blade(s);"}
          for(;amt_sword_life_stealing > 0; amt_sword_life_stealing--) {loot = loot + "" + "1 " + choose_weapon("sword") + " of life stealing;"}
          for(;amt_sword_wounding > 0; amt_sword_wounding--) {loot = loot + "" + "1 " + choose_weapon("sword") + " of wounding;"}
          if(amt_tentacle_rod > 0) {loot = loot + "" + amt_tentacle_rod + " tentacle rod(s);"}
          for(;amt_vicious_weapon > 0; amt_vicious_weapon--) {loot = loot + "" + "1 vicious " + choose_weapon("any") + ";"}
          if(amt_wand_binding > 0) {loot = loot + "" + amt_wand_binding + " wand(s) of binding;"}
          if(amt_wand_enemy_detection > 0) {loot = loot + "" + amt_wand_enemy_detection + " wand(s) of enemy detection;"}
          if(amt_wand_fear > 0) {loot = loot + "" + amt_wand_fear + " wand(s) of fear;"}
          if(amt_wand_fireballs > 0) {loot = loot + "" + amt_wand_fireballs + " wand(s) of fireballs;"}
          if(amt_wand_lightning_bolts > 0) {loot = loot + "" + amt_wand_lightning_bolts + " wand(s) of lightning bolts;"}
          if(amt_wand_paralysis > 0) {loot = loot + "" + amt_wand_paralysis + " wand(s) of paralysis;"}
          if(amt_wand_war_mage_2 > 0) {loot = loot + "" + amt_wand_war_mage_2 + " wand(s) of the war mage +2;"}
          if(amt_wand_wonder > 0) {loot = loot + "" + amt_wand_wonder + " wand(s) of wonder;"}
          if(amt_wings_flying > 0) {loot = loot + "" + amt_wings_flying + " wings of flying;"}
      }
      
     //Display results in chat
      //Currency
      loot = loot + "" + treasure_hoard_cp + " cp;"
      loot = loot + "" + treasure_hoard_sp + " sp;"
      loot = loot + "" + treasure_hoard_ep + " ep;"
      loot = loot + "" + treasure_hoard_gp + " gp;"
      loot = loot + "" + treasure_hoard_pp + " pp;"

      sendChat(msg.who, "/w gm end: " + loot)

  }
);