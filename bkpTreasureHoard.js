
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
      armor_result = 0
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
              armor_result = armor[Math.floor(amt_armors - 1)][0]
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
              weapon_result = weapons[Math.floor(amt_weapons - 1)][0]
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
              //For each, ['name', utility, 'type']
              //Utility is AC (-1 if stealth disadvantage)
              armor_padded = ['padded', 10, 'light'],
              armor_leather = ['leather', 11, 'light'],
              armor_studded_leather = ['studded leather', 12, 'light'],
              armor_hide = ['hide', 12, 'medium'],
              armor_chain_shirt = ['chain shirt', 13, 'medium'],
              armor_scale_mail = ['scale mail', 13, 'medium'],
              armor_breastplate = ['breastplate', 14, 'medium'],
              armor_half_plate = ['half plate', 14, 'medium'],
              armor_ring_mail = ['ring mail', 13, 'heavy'],
              armor_chain_mail = ['chain mail', 15, 'heavy'],
              armor_splint = ['splint', 16, 'heavy'],
              armor_plate = ['plate', 17, 'heavy'],
          ],
          weapons = [
              //For each, ['name', utility, 'damage type', 'weapon type']
              //Utility is calculated by the following:
              //max damage + min damage
              //+ 1 each for reach, finesse, versatile, thrown, light
              //- 1 each for heavy, two-handed, loading0
              weapon_club = ['club', 6, 'bludgeoning', 'club'],
              weapon_dagger = ['dagger', 8, 'piercing', 'dagger'],
              weapon_greatclub = ['greatclub', 8, 'bludgeoning', 'club'],
              weapon_handaxe = ['handaxe', 9, 'slashing', 'axe'],
              weapon_javelin = ['javelin', 8, 'bludgeoning', 'javelin'],
              weapon_light_hammer = ['light hammer', 7, 'bludgeoning', 'hammer'],
              weapon_mace = ['mace', 7, 'bludgeoning', 'mace'],
              weapon_quarterstaff = ['quarterstaff', 8, 'bludgeoning', 'staff'],
              weapon_sickle = ['sickle', 6, 'slashing', 'sickle'],
              weapon_spear = ['spear', 9, 'piercing', 'spear'],
              weapon_crossbow_light = ['light crossbow', 7, 'piercing', 'crossbow'],
              weapon_dart = ['dart', 7, 'piercing', 'dart'],
              weapon_shortbow = ['shortbow', 6, 'piercing', 'bow'],
              weapon_sling = ['sling', 5, 'bludgeoning', 'sling'],
              weapon_battleaxe = ['battleaxe', 10, 'slashing', 'axe'],
              weapon_flail = ['flail', 9, 'bludgeoning', 'flail'],
              weapon_glaive = ['glaive', 10, 'slashing', 'polearm'],
              weapon_greataxe = ['greataxe', 11, 'slashing', 'axe'],
              weapon_greatsword = ['greatsword', 12, 'slashing', 'sword'],
              weapon_halberd = ['halberd', 10, 'slashing', 'polearm'],
              weapon_lance = ['lance', 10, 'piercing', 'lance'],
              weapon_longsword = ['longsword', 10, 'slashing', 'sword'],
              weapon_maul = ['maul', 12, 'bludgeoning', 'maul'],
              weapon_morningstar = ['morningstar', 10, 'piercing', 'morningstar'],
              weapon_pike = ['pike', 10, 'piercing', 'polearm'],
              weapon_rapier = ['rapier', 10, 'piercing', 'sword'],
              weapon_scimitar = ['scimitar', 9, 'slashing', 'sword'],
              weapon_shortsword = ['shortsword', 9, 'piercing', 'sword'],
              weapon_trident = ['trident', 9, 'piercing', 'trident'],
              weapon_war_pick = ['war pick', 9, 'piercing', 'war pick'],
              weapon_warhammer = ['warhammer', 10, 'bludgeoning', 'hammer'],
              weapon_whip = ['whip', 7, 'slashing', 'whip'],
              weapon_blowgun = ['blowgun', 3, 'piercing', 'blowgun'],
              weapon_crossbow_hand = ['hand crossbow', 8, 'piercing', 'crossbow'],
              weapon_crossbow_heavy = ['heavy crossbow', 8, 'piercing', 'crossbow'],
              weapon_longbow = ['longbow', 8, 'piercing', 'bow'],
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
          if(gems_azurite > 0) {loot = loot + "" + gems_azurite + " azurite gemstone(s) (10 gp each);"}
          if(gems_banded_agate > 0) {loot = loot + "" + gems_banded_agate + " banded agate gemstone(s) (10 gp each);"}
          if(gems_blue_quartz > 0) {loot = loot + "" + gems_blue_quartz + " blue quartz gemstone(s) (10 gp each);"}
          if(gems_eye_agate > 0) {loot = loot + "" + gems_eye_agate + " eye agate gemstone(s) (10 gp each);"}
          if(gems_hematite > 0) {loot = loot + "" + gems_hematite + " hematite gemstone(s) (10 gp each);"}
          if(gems_lapis_lazuli > 0) {loot = loot + "" + gems_lapis_lazuli + " lapis lazuli gemstone(s) (10 gp each);"}
          if(gems_malachite > 0) {loot = loot + "" + gems_malachite + " malachite gemstone(s) (10 gp each);"}
          if(gems_moss_agate > 0) {loot = loot + "" + gems_moss_agate + " moss agate gemstone(s) (10 gp each);"}
          if(gems_obsidian > 0) {loot = loot + "" + gems_obsidian + " obsidian gemstone(s) (10 gp each);"}
          if(gems_rhodochrosite > 0) {loot = loot + "" + gems_rhodochrosite + " rhodochrosite gemstone(s) (10 gp each);"}
          if(gems_tiger_eye > 0) {loot = loot + "" + gems_tiger_eye + " tiger eye gemstone(s) (10 gp each);"}
          if(gems_turquoise > 0) {loot = loot + "" + gems_turquoise + " turquoise gemstone(s) (10 gp each);"}
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
          if(gems_bloodstone > 0) {loot = loot + "" + gems_bloodstone + " bloodstone gemstone(s) (50 gp each);"}
          if(gems_carnelian > 0) {loot = loot + "" + gems_carnelian + " carnelian gemstone(s) (50 gp each);"}
          if(gems_chalcedony > 0) {loot = loot + "" + gems_chalcedony + " chalcedony gemstone(s) (50 gp each);"}
          if(gems_chrysoprase > 0) {loot = loot + "" + gems_chrysoprase + " chrysoprase gemstone(s) (50 gp each);"}
          if(gems_citrine > 0) {loot = loot + "" + gems_citrine + " citrine gemstone(s) (50 gp each);"}
          if(gems_jasper > 0) {loot = loot + "" + gems_jasper + " jasper gemstone(s) (50 gp each);"}
          if(gems_moonstone > 0) {loot = loot + "" + gems_moonstone + " moonstone gemstone(s) (50 gp each);"}
          if(gems_onyx > 0) {loot = loot + "" + gems_onyx + " onyx gemstone(s) (50 gp each);"}
          if(gems_quartz > 0) {loot = loot + "" + gems_quartz + " quartz gemstone(s) (50 gp each);"}
          if(gems_sardonyx > 0) {loot = loot + "" + gems_sardonyx + " sardonyx gemstone(s) (50 gp each);"}
          if(gems_star_rose_quartz > 0) {loot = loot + "" + gems_star_rose_quartz + " star rose quartz gemstone(s) (50 gp each);"}
          if(gems_zircon > 0) {loot = loot + "" + gems_zircon + " zircon gemstone(s) (50 gp each);"}
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
          if(gems_amber > 0) {loot = loot + "" + gems_amber + " Amber (" + select_random(['transparent watery gold', 'rich gold']) + ") (100 gp each);"}
          if(gems_amethyst > 0) {loot = loot + "" + gems_amethyst + " Amethyst (transparent deep purple) (100 gp each);"}
          if(gems_chrysoberyl > 0) {loot = loot + "" + gems_chrysoberyl + " Chrysoberyl (" + select_random(['transparent yellow-green', 'pale green']) + ") (100 gp each);"}
          if(gems_coral > 0) {loot = loot + "" + gems_coral + " Coral (opaque crimson) (100 gp each);"}
          if(gems_garnet > 0) {loot = loot + "" + gems_garnet + " Garnet (" + select_random(['transparent red', 'brown-green', 'violet']) + ") (100 gp each);"}
          if(gems_jade > 0) {loot = loot + "" + gems_jade + " jade (" + select_random(['translucent light green', 'deep green' , 'white']) + ") (100 gp each);"}
          if(gems_jet > 0) {loot = loot + "" + gems_jet + " jet (opaque deep black) (100 gp each);"}
          if(gems_pearl > 0) {loot = loot + "" + gems_pearl + " Pearl (" + select_random(['opaque lustrous white' , 'yellow', 'pink']) + ") (100 gp each);"}
          if(gems_spinel > 0) {loot = loot + "" + gems_spinel + " Spinel (" + select_random(['transparent red', 'red-brown',  'deep green']) + ") (100 gp each);"}
          if(gems_tourmaline > 0) {loot = loot + "" + gems_tourmaline + " Tourmaline (" + select_random(['transparent pale green' , 'blue', 'brown' , 'red']) + ") (100 gp each);"}
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
          if(gems_alexandrite > 0) {loot = loot + "" + gems_alexandrite + " Alexandrite (transparent dark green) (500 gp each);"}
          if(gems_aquamarine > 0) {loot = loot + "" + gems_aquamarine + " Aquamarine (transparent pale blue-green) (500 gp each);"}
          if(gems_black_pearl > 0) {loot = loot + "" + gems_black_pearl + " Black pearl (opaque pure black) (500 gp each);"}
          if(gems_blue_spinel > 0) {loot = loot + "" + gems_blue_spinel + " Blue spinel (transparent deep blue) (500 gp each);"}
          if(gems_peridot > 0) {loot = loot + "" + gems_peridot + " Peridot (transparent rich olive green)) (500 gp each);"}
          if(gems_topaz > 0) {loot = loot + "" + gems_topaz + " Topaz (transparent golden yellow) (500 gp each);"}
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
          if(gems_black_opal > 0) {loot = loot + "" + gems_black_opal + " Black opal (translucent dark green with black mottling and golden flecks) (1000 gp each);"}
          if(gems_blue_sapphire > 0) {loot = loot + "" + gems_blue_sapphire + " Blue sapphire (" + select_random(['transparent blue-white' , 'medium blue']) + ") (1000 gp each);"}
          if(gems_emerald > 0) {loot = loot + "" + gems_emerald + " Emerald (transparent deep bright green) (1000 gp each);"}
          if(gems_fire_opal > 0) {loot = loot + "" + gems_fire_opal + " Fire opal (translucent fiery red) (1000 gp each);"}
          if(gems_opal > 0) {loot = loot + "" + gems_opal + " Opal (translucent pale blue with green and golden mottling) (1000 gp each);"}
          if(gems_star_ruby > 0) {loot = loot + "" + gems_star_ruby + " Star ruby (translucent ruby with white star-shaped center) (1000 gp each);"}
          if(gems_star_sapphire > 0) {loot = loot + "" + gems_star_sapphire + " Star sapphire (translucent blue sapphire with white star-shaped center) (1000 gp each);"}
          if(gems_yellow_sapphire > 0) {loot = loot + "" + gems_yellow_sapphire + " Yellow sapphire (" + select_random(['transparent fiery yellow' , 'yellow·green']) + ") (1000 gp each);"}
      }

      //5000 gp Gemstones
      if(amt_5000_gp_gems > 0) {
          gems_black_sapphire = 0; gems_diamond = 0; gems_jacinth = 0; gems_ruby = 0
          for(gems_type = RandomInt(8); amt_5000_gp_gems > 0; amt_5000_gp_gems--, gems_type = RandomInt(8)) {
              if(gems_type == 1) {gems_black_sapphire++} else if(gems_type == 2) {gems_diamond++}
              else if(gems_type == 3) {gems_jacinth++} else if(gems_type == 4) {gems_ruby++}
          } 
          //Display results in chat
          if(gems_black_sapphire > 0) {loot = loot + "" + gems_black_sapphire + " Black sapphire (translucent lustrous black with glowing highlights) (5000 gp each);"}
          if(gems_diamond > 0) {loot = loot + "" + gems_diamond + " Diamond (" + select_random(['transparent blue-white' , 'canary', 'pink', 'brown', 'blue']) + ") (5000 gp each);"}
          if(gems_jacinth > 0) {loot = loot + "" + gems_jacinth + " jacinth (transparent fiery orange) (5000 gp each);"}
          if(gems_ruby > 0) {loot = loot + "" + gems_ruby + " Ruby (" + select_random(['transparent clear red' , 'deep crimson']) + ") (5000 gp each);"}
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
          if(art_silver_ewer > 0) {loot = loot + "" + art_silver_ewer + " silver ewer(s) (25 gp each);"}
          if(art_bone_statuette > 0) {loot = loot + "" + art_bone_statuette + " carved bone statuette(s) (25 gp each);"}
          if(art_small_gold_bracelet > 0) {loot = loot + "" + art_small_gold_bracelet + " small gold bracelet(s) (25 gp each);"}
          if(art_cloth_of_gold_vestments > 0) {loot = loot + "" + art_cloth_of_gold_vestments + " cloth-of-gold vestment(s) (25 gp each);"}
          if(art_black_velvet_mask > 0) {loot = loot + "" + art_black_velvet_mask + " black velvet mask(s) stitched with a silver thread (25 gp each);"}
          if(art_copper_chalice > 0) {loot = loot + "" + art_copper_chalice + " copper chalice(s) with a silver figure (25 gp each);"}
          if(art_bone_dice > 0) {loot = loot + "" + art_bone_dice + " pair(s) of engraved bone dice (25 gp each);"}
          if(art_small_mirror > 0) {loot = loot + "" + art_small_mirror + " small mirror(s) set in a painted wood frame (25 gp each);"}
          if(art_silk_handkerchief > 0) {loot = loot + "" + art_silk_handkerchief + " embroidered silk handkerchief(s) (25 gp each);"}
          if(art_gold_locket > 0) {loot = loot + "" + art_gold_locket + " gold locket(s) with a painted portrait inside (25 gp each);"}
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
          if(art_gold_ring > 0) {loot = loot + "" + art_gold_ring + " Gold ring(s) set with bloodstones (250 gp each);"}
          if(art_ivory_statuette > 0) {loot = loot + "" + art_ivory_statuette + " Carved ivory statuette(s) (250 gp each);"}
          if(art_large_gold_bracelet > 0) {loot = loot + "" + art_large_gold_bracelet + " Large gold bracelet(s) (250 gp each);"}
          if(art_silver_necklace > 0) {loot = loot + "" + art_silver_necklace + " Silver necklace with a gemstone pendant(s) (250 gp each);"}
          if(art_bronze_crown > 0) {loot = loot + "" + art_bronze_crown + " Bronze crown(s) (250 gp each);"}
          if(art_silk_robe > 0) {loot = loot + "" + art_silk_robe + " Silk robe(s) with gold embroidery (250 gp each);"}
          if(art_large_tapestry > 0) {loot = loot + "" + art_large_tapestry + " Large well-made tapestry (250 gp each);"}
          if(art_brass_mug > 0) {loot = loot + "" + art_brass_mug + " Brass mug with jade inlay (250 gp each);"}
          if(art_animal_figurines > 0) {loot = loot + "" + art_animal_figurines + " Box(es) of turquoise animal figurines (250 gp each);"}
          if(art_gold_cage > 0) {loot = loot + "" + art_gold_cage + " Gold bird cage(s) with electrum filigree (250 gp each);"}
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
          if(art_silver_chalice > 0) {loot = loot + "" + art_silver_chalice + " Silver chalice(s) set with moonstones (750 gp each);"}
          if(art_silver_sword > 0) {loot = loot + "" + art_silver_sword + " Silver-plated steel longsword(s) with jet set in hilt (750 gp each);"}
          if(art_carved_harps > 0) {loot = loot + "" + art_carved_harps + " Carved harp(s) of exotic wood with ivory inlay and zircon gems (750 gp each);"}
          if(art_gold_idol > 0) {loot = loot + "" + art_gold_idol + " Small gold idol(s) (750 gp each);"}
          if(art_gold_comb > 0) {loot = loot + "" + art_gold_comb + " Gold dragon comb(s) set with red garnets as eyes (750 gp each);"}
          if(art_bottle_stopper > 0) {loot = loot + "" + art_bottle_stopper + " Bottle stopper cork(s) embossed with gold leaf and set with amethysts (750 gp each);"}
          if(art_ceremonial_dagger > 0) {loot = loot + "" + art_ceremonial_dagger + " Ceremonial electrum dagger with a black pearl in the pommel (750 gp each);"}
          if(art_silver_brooch > 0) {loot = loot + "" + art_silver_brooch + " Silver and gold brooch (750 gp each);"}
          if(art_obsidian_statuette > 0) {loot = loot + "" + art_obsidian_statuette + " Obsidian statuette(s) with gold fittings and inlay (750 gp each);"}
          if(art_gold_mask > 0) {loot = loot + "" + art_gold_mask + " Painted gold war mask(s) (750 gp each);"}
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
          if(art_gold_chain > 0) {loot = loot + "" + art_gold_chain + " Fine gold chain(s) set with a fire opal (2500 gp each);"}
          if(art_old_painting > 0) {loot = loot + "" + art_old_painting + " Old masterpiece painting(s) (2500 gp each);"}
          if(art_silk_mantle > 0) {loot = loot + "" + art_silk_mantle + " Embroidered silk and velvet mantle(s) set with numerous moonstones (2500 gp each);"}
          if(art_platinum_bracelet > 0) {loot = loot + "" + art_platinum_bracelet + " Platinum bracelet(s) set with a sapphire (2500 gp each);"}
          if(art_glove_set > 0) {loot = loot + "" + art_glove_set + " Embroidered glove set(s) with jewel chips (2500 gp each);"}
          if(art_jeweled_anklet > 0) {loot = loot + "" + art_jeweled_anklet + " jeweled anklet(s) (2500 gp each);"}
          if(art_gold_box > 0) {loot = loot + "" + art_gold_box + " Gold music box(es) (2500 gp each);"}
          if(art_gold_circlet > 0) {loot = loot + "" + art_gold_circlet + " Gold circlet set(s) with four aquamarines (2500 gp each);"}
          if(art_eye_patch > 0) {loot = loot + "" + art_eye_patch + " Eye patch with a mock eye set in blue sapphire and moonstone (2500 gp each);"}
          if(art_string_pearls > 0) {loot = loot + "" + art_string_pearls + " A necklace string of small pink pearls (2500 gp each);"}
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
          if(art_gold_crown > 0) {loot = loot + "" + art_gold_crown + " Jeweled gold crown (7500 gp each);"}
          if(art_platinum_ring > 0) {loot = loot + "" + art_platinum_ring + " jeweled platinum ring (7500 gp each);"}
          if(art_gold_statuette > 0) {loot = loot + "" + art_gold_statuette + " Small gold statuette set with rubies (7500 gp each);"}
          if(art_gold_cups > 0) {loot = loot + "" + art_gold_cups + " Gold cup set with emeralds (7500 gp each);"}
          if(art_jewelery_box > 0) {loot = loot + "" + art_jewelery_box + " Gold jewelry box with platinum filigree (7500 gp each);"}
          if(art_gold_sarcophagus > 0) {loot = loot + "" + art_gold_sarcophagus + " Painted gold child's sarcophagus (7500 gp each);"}
          if(art_jade_board > 0) {loot = loot + "" + art_jade_board + " jade game board with solid gold playing pieces (7500 gp each);"}
          if(art_ivory_horn > 0) {loot = loot + "" + art_ivory_horn + " Bejeweled ivory drinking horn with gold filigree (7500 gp each);"}
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
          
          if(amt_pot_healing > 0) {loot = loot + "" + amt_pot_healing + " potion(s) of healing;"}
          for (;amt_ss_can > 0; amt_ss_can--) {loot = loot + "" + "Spell scroll of " + scroll_spell('cantrip') + " (cantrip);"}
          if(amt_pot_climbing > 0) {loot = loot + "" + amt_pot_climbing + " potion(s) of climbing;"}
          for (;amt_ss_1 > 0; amt_ss_1--) {loot = loot + "" + "Spell scroll of " + scroll_spell(1) + " (lvl 1);"}
          for (;amt_ss_2 > 0; amt_ss_2--) {loot = loot + "" + "Spell scroll of " + scroll_spell(2) + " (lvl 2);"}
          if(amt_pot_greater_healing > 0) {loot = loot + "" + amt_pot_greater_healing + " potion(s) of greater healing;"}
          if(amt_bag_of_holding > 0) {loot = loot + "" + amt_bag_of_holding + " bag(s) of holding;"}
          if(amt_driftglobe > 0) {loot = loot + "" + amt_driftglobe + " driftglobe(s);"}
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
          
          if(amt_pot_greater_healing > 0) {loot = loot + "" + amt_pot_greater_healing + " potion(s) of greater healing;"}
          if(amt_pot_fire_breath > 0) {loot = loot + "" + amt_pot_fire_breath + " potion(s) of fire breath;"}
          if(amt_pot_resistance > 0) {loot = loot + "" + amt_pot_resistance + " potion(s) of resistance;"}
          for(;amt_ammo_1 > 0; amt_ammo_1--) {
              ammo_rand = ammo[Math.floor(Math.random() * ammo.length)]
              loot = loot + "" + ammo_rand + " enchanted + 1;"}
          if(amt_pot_animal_friendship > 0) {loot = loot + "" + amt_pot_animal_friendship + " potion(s) of animal friendship;"}
          if(amt_pot_hill_giant_str > 0) {loot = loot + "" + amt_pot_hill_giant_str + " potion(s) of hill giant strength;"}
          if(amt_pot_growth > 0) {loot = loot + "" + amt_pot_growth + " potion(s) of growth;"}
          if(amt_pot_water_breathing > 0) {loot = loot + "" + amt_pot_water_breathing + " potion(s) of water breathing;"}
          for(;amt_ss_2 > 0; amt_ss_2--) {loot = loot + "" + "Spell scroll of " + scroll_spell(2) + " (lvl 2);"}
          for(;amt_ss_3 > 0; amt_ss_3--) {loot = loot + "" + "Spell scroll of " + scroll_spell(3) + " (lvl 3);"}
          if(amt_bag_of_holding > 0) {loot = loot + "" + amt_bag_of_holding + " bag(s) of holding;"}
          if(amt_keoghtoms_ointment > 0) {loot = loot + "" + amt_keoghtoms_ointment + " Keoghtom's Ointment(s);"}
          if(amt_oil_slipperiness > 0) {loot = loot + "" + amt_oil_slipperiness + " oil(s) of slipperiness;"}
          if(amt_dust_disappearance > 0) {loot = loot + "" + amt_dust_disappearance + " dust(s) of dissappearance;"}
          if(amt_dust_dryness > 0) {loot = loot + "" + amt_dust_dryness + " dust(s) of dryness;"}
          if(amt_dust_sneezing_choking > 0) {loot = loot + "" + amt_dust_sneezing_choking + " dust(s) of sneezing and choking;"}
          if(amt_elemental_gem > 0) {
              elemental_gem_types = [
                  'blue sapphire (air elemental)',
                  'yellow diamond (earth elemental)',
                  'red corundum (fire elemental)',
                  'emerald (water elemental)',
              ]
              elemental_gem_rand = elemental_gem_types[Math.floor(Math.random() * elemental_gem_types.length)]
              loot = loot + "" + elemental_gem_rand + " gem;"}
          if(amt_philter_love > 0) {loot = loot + "" + amt_philter_love + " philter(s) of love;"}
          if(amt_alchemy_jug > 0) {loot = loot + "" + amt_alchemy_jug + " alchemy jug(s);"}
          if(amt_cap_water_breathing > 0) {loot = loot + "" + amt_cap_water_breathing + " cap(s) of water breathing;"}
          if(amt_cloak_manta_ray > 0) {loot = loot + "" + amt_cloak_manta_ray + " cloak(s) of the manta ray;"}
          if(amt_driftglobe > 0) {loot = loot + "" + amt_driftglobe + " driftglobe(s);"}
          if(amt_goggles_night > 0) {loot = loot + "" + amt_goggles_night + " goggles of night;"}
          if(amt_helm_comprehending_languages > 0) {loot = loot + "" + amt_helm_comprehending_languages + " helm(s) of comprehending languages;"}
          if(amt_immovable_rod > 0) {loot = loot + "" + amt_immovable_rod + " immovable rod(s);"}
          if(amt_lantern_revealing > 0) {loot = loot + "" + amt_lantern_revealing + " lantern(s) of revealing;"}
          for(; amt_mariners_armor > 0; amt_mariners_armor--) {loot = loot + "" + choose_armor() + " mariner's armor;"}
          for(; amt_mithral_armor > 0; amt_mithral_armor--) {loot = loot + "" + choose_armor("mithral") + " mithral armor;"}
          if(amt_potion_poison > 0) {loot = loot + "" + amt_potion_poison + " potion(s) of poison;"}
          if(amt_ring_swimming > 0) {loot = loot + "" + amt_ring_swimming + " ring(s) of swimming;"}
          if(amt_robe_useful_items > 0) {loot = loot + "" + amt_robe_useful_items + " robe(s) of useful items;"}
          if(amt_rope_climbing > 0) {loot = loot + "" + amt_rope_climbing + " rope(s) of climbing;"}
          if(amt_saddle_cavalier > 0) {loot = loot + "" + amt_saddle_cavalier + " saddle(s) of the cavalier;"}
          if(amt_wand_magic_detection > 0) {loot = loot + "" + amt_wand_magic_detection + " wand(s) of magic detection;"}
          if(amt_wand_secrets > 0) {loot = loot + "" + amt_wand_secrets + " wand(s) of secrets;"}
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
          
          if(amt_pot_superior_healing > 0) {loot = loot + "" + amt_pot_superior_healing + " potion(s) of superior healing;"}
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
          
          for(; amt_weapon_1 > 0; amt_weapon_1--) {loot = loot + "" + choose_weapon("any") + " (enchantment +1);"}
          if(amt_shield_1 > 0) {loot = loot + "" + amt_shield_1 + " shield(s) (enchantment +1);"}
          if(amt_sentinel_shield > 0) {loot = loot + "" + amt_sentinel_shield + " sentinel shield(s);"}
          if(amt_amulet_proof_against_detection_location > 0) {loot = loot + "" + amt_amulet_proof_against_detection_location + " amulet(s) of proof against detection and location;"}
          if(amt_boots_elvenkind > 0) {loot = loot + "" + amt_boots_elvenkind + " boots of elvenkind;"}
          if(amt_boots_striding_springing > 0) {loot = loot + "" + amt_boots_striding_springing + " boots of striding and springing;"}
          if(amt_bracers_archery > 0) {loot = loot + "" + amt_bracers_archery + " bracers of archery;"}
          if(amt_brooch_shielding > 0) {loot = loot + "" + amt_brooch_shielding + " brooch(es) of shielding;"}
          if(amt_broom_flying > 0) {loot = loot + "" + amt_broom_flying + " broom(s) of flying;"}
          if(amt_cloak_elvenkind > 0) {loot = loot + "" + amt_cloak_elvenkind + " cloak(s) of elvenkind;"}
          if(amt_cloak_protection > 0) {loot = loot + "" + amt_cloak_protection + " cloak(s) of protection;"}
          if(amt_gauntlets_ogre_power > 0) {loot = loot + "" + amt_gauntlets_ogre_power + " gauntlets of ogre power;"}
          if(amt_hat_disguise > 0) {loot = loot + "" + amt_hat_disguise + " hat(s) of disguise;"}
          if(amt_javelin_lightning > 0) {loot = loot + "" + amt_javelin_lightning + " javelin(s) of lightning;"}
          if(amt_pearl_power > 0) {loot = loot + "" + amt_pearl_power + " pearl(s) of power;"}
          if(amt_rod_pact_keeper_1 > 0) {loot = loot + "" + amt_rod_pact_keeper_1 + " rod(s) of the pact keeper (+1);"}
          if(amt_slippers_spider_climbing > 0) {loot = loot + "" + amt_slippers_spider_climbing + " slippers of spider climbing;"}
          if(amt_staff_adder > 0) {loot = loot + "" + amt_staff_adder + " staff(ves) of the adder;"}
          if(amt_staff_python > 0) {loot = loot + "" + amt_staff_python + " staff(ves) of the python;"}
          for(; amt_sword_vengeance > 0; amt_sword_vengeance--) {loot = loot + "" + choose_weapon("sword") + " of vengeance;"}
          if(amt_trident_fish_command > 0) {loot = loot + "" + amt_trident_fish_command + " trident(s) of fish command;"}
          if(amt_wand_magic_missiles > 0) {loot = loot + "" + amt_wand_magic_missiles + " wand(s) of magic missiles;"}
          if(amt_wand_war_mage_1 > 0) {loot = loot + "" + amt_wand_war_mage_1 + "wand(s) of the war mage (+1);"}
          if(amt_wand_web > 0) {loot = loot + "" + amt_wand_web + " wand(s) of web;"}
          for(; amt_weapon_warning > 0; amt_weapon_warning--) {loot = loot + "" + choose_weapon("any") + " of warning;"}
          if(amt_adamantine_chain_mail > 0) {loot = loot + "" + amt_adamantine_chain_mail + " adamantine chain mail;"}
          if(amt_adamantine_chain_shirt > 0) {loot = loot + "" + amt_adamantine_chain_shirt + " adamantine chain shirt;"}
          if(amt_adamantine_scale_mail > 0) {loot = loot + "" + amt_adamantine_scale_mail + " adamantine scale mail;"}
          if(amt_bag_tricks_gray > 0) {loot = loot + "" + amt_bag_tricks_gray + " gray bag(s) of tricks;"}
          if(amt_bag_tricks_rust > 0) {loot = loot + "" + amt_bag_tricks_rust + " rust bag(s) of tricks;"}
          if(amt_bag_tricks_tan > 0) {loot = loot + "" + amt_bag_tricks_tan + " tan bag(s) of tricks;"}
          if(amt_boots_winterlands > 0) {loot = loot + "" + amt_boots_winterlands + " boots of the winterlands;"}
          if(amt_circlet_blasting > 0) {loot = loot + "" + amt_circlet_blasting + " circlet(s) of blasting;"}
          for(card_amount = 35 - RandomInt(20); amt_deck_illusions > 0; 
              amt_deck_illusions--, card_amount = 35 - RandomInt(20)) {
              loot = loot + "" + "1 deck of illusions with " + card_amount + " cards;"
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
});