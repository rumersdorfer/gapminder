/* *****************************************************************************
 * Caleydo - Visualization for Molecular Biology - http://caleydo.org
 * Copyright (c) The Caleydo Team. All rights reserved.
 * Licensed under the new BSD license, available at http://caleydo.org/license
 **************************************************************************** */

import {register} from 'phovea_core/src/plugin';

/**
 * build a registry by registering all phovea modules
 */
//other modules
import 'phovea_core/phovea_registry.js';
import 'phovea_vis/phovea_registry.js';
import 'phovea_d3/phovea_registry.js';
import 'phovea_ui/phovea_registry.js';
import 'phovea_clue/phovea_registry.js';
//self
register('gapminder',require('./phovea.js'));
