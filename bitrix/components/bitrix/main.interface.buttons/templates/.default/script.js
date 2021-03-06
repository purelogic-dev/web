BX.namespace('BX.Main');

if (typeof(BX.Main.interfaceButtons) === 'undefined')
{
	/**
	 * @param {object} params parameters
	 * @property {string} containerId @required
	 * @property {object} classes
	 * @property {string} classes.item Class for list item
	 * @property {string} classes.itemSublink Class for sublink (ex. Add link)
	 * @property {string} classes.itemText Class for item text and submenu item text
	 * @property {string} classes.itemCounter Class for list item counter and submenu item counter
	 * @property {string} classes.itemIcon Class for list item icon and submenu item icon
	 * @property {string} classes.itemMore Class for more button
	 * @property {string} classes.itemOver Class for hovered item
	 * @property {string} classes.itemActive Class for active item
	 * @property {string} classes.itemDisabled Class for disabled elements
	 * @property {string} classes.itemLocked Class for locked item. Added for list and submenu item
	 * @property {string} classes.onDrag Class added for container on dragstart event and removed on drag end event
	 * @property {string} classes.dropzone Class for dropzone in submenu
	 * @property {string} classes.seporator Class for submenu seporator before diabled items
	 * @property {string} classes.submenuItem Class for submenu item
	 * @property {string} classes.submenu Class for submenu container
	 * @property {string} classes.secret Class for hidden alias items (set display: none; for items)
	 * @property {object} messages Messages object. Contains localization strings
	 * @property {string} messages.MIB_DROPZONE_TEXT Dropzone text
	 * @property {string} messages.MIB_LICENSE_BUY_BUTTON License window Buy button text
	 * @property {string} messages.MIB_LICENSE_TRIAL_BUTTON License window Trial button text
	 * @property {string} messages.MIB_LICENSE_WINDOW_HEADER_TEXT License window header text
	 * @property {string} messages.MIB_LICENSE_WINDOW_TEXT License window content text
	 * @property {string} messaget.MIB_LICENSE_WINDOW_TRIAL_SUCCESS_TEXT Trial success text
	 * @property {object} licenseWindow Settings for license window
	 * @property {string} licenseWindow.isFullDemoExists Y|N
	 * @property {string} licenseWindow.hostname Hostname for license window ajax calls
	 * @property {string} licenseWindow.ajaxUrl Ajax handler url
	 * @property {string} licenseWindow.licenseAllPath
	 * @property {string} licenseWindow.licenseDemoPath
	 * @property {string} licenseWindow.featureGroupName
	 * @property {string} licenseWindow.ajaxActionsUrl
	 */
	BX.Main.interfaceButtons = function(container, params)
	{
		/**
		 * Sets default values
		 */
		this.classItem = 'main-buttons-item';
		this.classItemSublink = 'main-buttons-item-sublink';
		this.classItemText = 'main-buttons-item-text';
		this.classItemCounter = 'main-buttons-item-counter';
		this.classItemIcon = 'main-buttons-item-icon';
		this.classItemMore = 'main-buttons-item-more';
		this.classOnDrag = 'main-buttons-drag';
		this.classDropzone = 'main-buttons-submenu-dropzone';
		this.classSeporator = 'main-buttons-submenu-seporator';
		this.classHiddenLabel = 'main-buttons-hidden-label';
		this.classSubmenuItem = 'main-buttons-submenu-item';
		this.classItemDisabled = 'main-buttons-disabled';
		this.classItemOver = 'over';
		this.classItemActive = 'main-buttons-item-active';
		this.classSubmenu = 'main-buttons-submenu';
		this.classSecret = 'secret';
		this.classItemLocked = 'locked';
		this.submenuIdPrefix = 'main_buttons_popup_';
		this.submenuWindowIdPrefix = 'menu-popup-';
		this.classSettingMenuItem = 'main-buttons-submenu-setting';
		this.classEditState = 'main-buttons-edit';
		this.classEditItemButton = 'main-buttons-item-edit-button';
		this.classDragItemButton = 'main-buttons-item-drag-button';
		this.classSettingsApplyButton = 'main-buttons-submenu-settings-apply';
		this.classSettingsResetButton = 'main-buttons-submenu-settings-reset';
		this.classSetHome = 'main-buttons-set-home';
		this.classSetHide = 'main-buttons-set-hide';
		this.classManage = 'main-buttons-manage';
		this.classContainer = 'main-buttons';
		this.classSubmenuNoHiddenItem = 'main-buttons-submenu-item-no-hidden';
		this.classDefaultSubmenuItem = 'menu-popup-item';
		this.listContainer = null;
		this.submenuContainer = null;
		this.pinContainer = null;
		this.dragItem = null;
		this.overItem = null;
		this.moreButton = null;
		this.messages = null;
		this.licenseParams = null;
		this.isSubmenuShown = false;
		this.isSubmenuShownOnDragStart = false;
		this.tmp = {};

		this.init(container, params);


		/**
		 * Public methods and properties
		 */
		return {
			getItemById: BX.delegate(this.getItemById, this),
			getAllItems: BX.delegate(this.getAllItems, this),
			getHiddenItems: BX.delegate(this.getHiddenItems, this),
			getVisibleItems: BX.delegate(this.getVisibleItems, this),
			getDisabledItems: BX.delegate(this.getDisabledItems, this),
			getMoreButton: BX.delegate(this.getMoreButton, this),
			adjustMoreButtonPosition: BX.delegate(this.adjustMoreButtonPosition, this),
			adjustSubmenuPosition: BX.delegate(this.adjustSubmenuPosition, this),
			showSubmenu: BX.delegate(this.showSubmenu, this),
			closeSubmenu: BX.delegate(this.closeSubmenu, this),
			refreshSubmenu: BX.delegate(this.refreshSubmenu, this),
			getCurrentSettings: BX.delegate(this.getCurrentSettings, this),
			saveSettings: BX.delegate(this.saveSettings, this),
			setCounterValueByItemId: BX.delegate(this.setCounterValueByItemId, this),
			getCounterValueByItemId: BX.delegate(this.getCounterValueByItemId, this),
			updateCounter: BX.delegate(this.updateCounter, this),
			getActive: BX.delegate(this.getActive, this),
			isEditEnabled: BX.delegate(this.isEditEnabled, this),
			isActiveInMoreMenu: BX.delegate(this.isActiveInMoreMenu, this),
			classes:
			{
				item: this.classItem,
				itemText: this.classItemText,
				itemCounter: this.classItemCounter,
				itemIcon: this.classItemIcon,
				itemDisabled: this.classItemDisabled,
				itemOver: this.classItemOver,
				itemActive: this.classItemActive,
				itemLocked: this.classItemLocked,
				submenu: this.classSubmenu,
				submenuItem: this.classSubmenuItem,
				containerOnDrag: this.classOnDrag,
				classSettingMenuItem: this.classSettingMenuItem
			},
			itemsContainer: this.listContainer,
			itemsContainerId: this.listContainer.id
		};
	};



	BX.Main.interfaceButtons.prototype =
	{
		/**
		 * Sets custom values and bind on events
		 * @method init
		 * @private
		 * @return {undefined}
		 */
		init: function(container, params)
		{
			this.setListContainer(container);

			if (!BX.type.isPlainObject(params))
			{
				throw 'BX.MainButtons: params is not Object';
			}

			if (!('containerId' in params) || !BX.type.isNotEmptyString(params.containerId))
			{
				throw 'BX.MainButtons: containerId not set in params';
			}

			if (!BX.type.isDomNode(this.listContainer))
			{
				throw 'BX.MainButtons: #' + params.containerId + ' is not dom node';
			}

			if (('classes' in params) && BX.type.isPlainObject(params.classes))
			{
				this.setCustomClasses(params.classes);
			}

			if (('messages' in params) && BX.type.isPlainObject(params.messages))
			{
				this.setMessages(params.messages);
			}

			if (('licenseWindow' in params) && BX.type.isPlainObject(params.licenseWindow))
			{
				this.setLicenseWindowParams(params.licenseWindow);
			}

			this.moreButton = this.getMoreButton();
			this.dragAndDropInit();
			this.adjustMoreButtonPosition();
			this.bindOnClickOnMoreButton();
			this.createFrame();
			this.bindOnResizeFrame();
			this.bindOnScrollWindow();
			this.setSubmenuContainer(this.getSubmenuContainer());
			this.setContainerHeight();
			this.setParentPinContainer();

			BX.bind(document, 'click', BX.delegate(this._onDocumentClick, this));
			BX.addCustomEvent("onPullEvent-main", BX.delegate(this._onPush, this));

			this.updateMoreButtonCounter();

			if (this.isActiveInMoreMenu())
			{
				this.activateItem(this.moreButton);
			}

			var visibleItems = this.getVisibleItems();
			var firstVisibleItem = BX.type.isArray(visibleItems) && visibleItems.length > 0 ? visibleItems[0] : null;
			var firstItemNode = BX.findChild(firstVisibleItem, { tagName: "a" }, true);

			if (!BX.type.isDomNode(firstItemNode))
			{
				return;
			}

			var firstPageLink = firstItemNode.getAttribute("href");
			if (firstPageLink.charAt(0) === "?")
			{
				firstPageLink = firstItemNode.pathname + firstItemNode.search;
			}

			if (!this.lastHomeLink)
			{
				this.lastHomeLink = firstPageLink;
			}
		},

		_onDocumentClick: function(event)
		{
			var item = this.getItem(event);
			var dataOnClick, currentItem, currentAlias, id, applyButton, settingsButton,
				visibleItems, visibleItemsLength;

			if (this.isDragButton(event.target))
			{
				event.preventDefault();
				event.stopPropagation();
			}

			if (BX.type.isDomNode(item))
			{
				if (!this.isSublink(event.target))
				{
					dataOnClick = this.dataValue(item, 'onclick');

					if (BX.type.isNotEmptyString(dataOnClick))
					{
						event.preventDefault();
						this.execScript(dataOnClick);
					}
				}

				if (this.isSettings(item))
				{
					this.enableEdit();
					BX.hide(this.getSettingsButton());
					BX.show(this.getSettingsApplyButton());
				}

				if (this.isApplySettingsButton(item))
				{
					event.preventDefault();
					event.stopPropagation();
					this.disableEdit();

					BX.show(this.getSettingsButton());
					BX.hide(this.getSettingsApplyButton());
				}

				if (this.isResetSettingsButton(item))
				{
					this.resetSettings();
				}

				if (this.isLocked(item))
				{
					event.preventDefault();
					this.showLicenseWindow();
				}

				if (this.isEditButton(event.target))
				{
					var dataItem, menu;
					event.preventDefault();
					event.stopPropagation();

					if (this.isSubmenuItem(item))
					{
						item = this.getItemAlias(item);
					}

					try {
						dataItem = JSON.parse(BX.data(item, 'item'));
					} catch (err) {}

					menu = this.getItemEditMenu();

					if (menu && menu.popupWindow.isShown() && this.lastEditNode === item)
					{
						menu.popupWindow.close();
					}
					else
					{
						this.showItemEditMenu(dataItem, event.target);
					}

					this.lastEditNode = item;
				}

				if (this.isSetHide(item))
				{
					visibleItems = this.getVisibleItems();
					visibleItemsLength = BX.type.isArray(visibleItems) ? visibleItems.length : null;
					id = this.editItemData.ID.replace(this.listContainer.id + '_', '');
					currentItem = this.getItemById(id);
					currentAlias = this.getItemAlias(currentItem);

					currentItem = !this.isVisibleItem(currentItem) ? currentItem : currentAlias;


					if (this.isDisabled(currentAlias))
					{
						this.enableItem(currentAlias);

					} else if (!this.isDisabled(currentAlias) && visibleItemsLength > 2)
					{
						this.disableItem(currentAlias);
					}

					BX.onCustomEvent(window, 'BX.Main.InterfaceButtons:onHideLastVisibleItem', [currentItem, this]);

					this.refreshSubmenu();
					this.saveSettings();

					this.adjustMoreButtonPosition();
					this.adjustSubmenuPosition();

					if (this.isEditEnabled())
					{
						this.enableEdit();
						BX.hide(this.getSettingsButton());
						BX.show(this.getSettingsApplyButton());
					}

					this.editMenu.popupWindow.close();
				}

				if (this.isSetHome(item))
				{
					id = this.editItemData.ID.replace(this.listContainer.id + '_', '');
					currentItem = this.getItemById(id);
					currentAlias = this.getItemAlias(currentItem);

					if (this.isDisabled(currentAlias))
					{
						this.enableItem(currentAlias);
					}

					this.listContainer.insertBefore(currentItem, BX.firstChild(this.listContainer));

					this.adjustMoreButtonPosition();
					this.adjustSubmenuPosition();
					this.refreshSubmenu();
					this.saveSettings();

					if (this.isEditEnabled())
					{
						this.enableEdit();
						BX.hide(this.getSettingsButton());
						BX.show(this.getSettingsApplyButton());
					}

					this.editMenu.popupWindow.close();
				}
			}

			if (this.isEditEnabled())
			{
				this.getSubmenu().popupWindow.setAutoHide(false);
			}
		},

		isActiveInMoreMenu: function()
		{
			var data;
			var hiddenItems = this.getHiddenItems();
			var disabledItems = this.getDisabledItems();
			var items = hiddenItems.concat(disabledItems);
			var isActive = items.some(function(current) {
				try {
					data = JSON.parse(BX.data(current, 'item'));
				} catch (err) {}

				return BX.type.isPlainObject(data) &&
					('IS_ACTIVE' in data && data.IS_ACTIVE === true || data.IS_ACTIVE === 'true' || data.IS_ACTIVE === 'Y');
			}, this);

			return isActive;
		},

		_onPush: function (command, params)
		{
			if (command === "user_counter" && params && BX.message("SITE_ID") in params)
			{
				var counters = params[BX.message("SITE_ID")];
				for (var counterId in counters)
				{
					this.updateCounter(counterId, counters[counterId]);
				}
			}
		},

		bindOnScrollWindow: function()
		{
			BX.bind(window, 'scroll', BX.delegate(this._onScroll, this));
		},


		setParentPinContainer: function()
		{
			this.pinContainer = this.findParentByClassName(this.moreButton, 'bx-pin');
		},

		getActive: function()
		{
			var items = this.getAllItems();
			var tmpData, node;
			var result = null;

			if (BX.type.isArray(items))
			{
				items.forEach(function(current) {
					try {
						tmpData = JSON.parse(BX.data(current, 'item'));
					} catch(err) {
						tmpData = null;
					}

					if (BX.type.isPlainObject(tmpData) && 'IS_ACTIVE' in tmpData &&
						(tmpData.IS_ACTIVE === true || tmpData.IS_ACTIVE === 'true' || tmpData.IS_ACTIVE === 'Y'))
					{
						result = tmpData;
					}
				}, this);
			}

			if (BX.type.isPlainObject(result))
			{
				node = BX(result.ID);

				if (BX.type.isDomNode(node))
				{
					result.NODE = node;
				}
				else
				{
					result.NODE = null;
				}
			}

			return result;
		},

		isSetHome: function(item)
		{
			return BX.hasClass(item, this.classSetHome);
		},

		isSetHide: function(item)
		{
			return BX.hasClass(item, this.classSetHide);
		},

		getSettingsButton: function()
		{
			return BX.findChild(this.getSubmenuContainer(), {class: this.classSettingMenuItem}, true, false);
		},

		getSettingsApplyButton: function()
		{
			return BX.findChild(this.getSubmenuContainer(), {class: this.classSettingsApplyButton}, true, false);
		},

		isApplySettingsButton: function(item)
		{
			return BX.hasClass(item, this.classSettingsApplyButton);
		},

		enableEdit: function()
		{
			var submenu = this.getSubmenu();

			if (submenu && 'popupWindow' in submenu)
			{
				submenu.popupWindow.setAutoHide(false);
			}

			BX.addClass(this.listContainer, this.classEditState);
			BX.addClass(this.getSubmenuContainer(), this.classEditState);
			this.isEditEnabledState = true;
		},

		disableEdit: function()
		{
			var menu = this.getSubmenu();

			if (menu && 'popupWindow' in menu)
			{
				menu.popupWindow.setAutoHide(true);
			}

			BX.removeClass(this.listContainer, this.classEditState);
			BX.removeClass(this.getSubmenuContainer(), this.classEditState);
			this.isEditEnabledState = false;
		},

		isEditEnabled: function()
		{
			return this.isEditEnabledState;
		},

		showItemEditMenu: function(dataItem, node)
		{
			var menuId, menu;

			if (BX.type.isPlainObject(dataItem) && 'ID' in dataItem)
			{
				menuId = [this.listContainer.id, '_edit_item'].join('');
				menu = BX.PopupMenu.getMenuById(menuId);

				if (menu)
				{
					BX.PopupMenu.destroy(menuId);
				}

				menu = this.createItemEditMenu(dataItem, menuId, node);

				menu.popupWindow.show();
			}
		},

		getContainer: function()
		{
			if (!BX.type.isDomNode(this.container))
			{
				this.container = BX.findChild(document, {class: this.classContainer}, true, false);
			}

			return this.container;
		},

		getItemEditMenu: function(menuId)
		{
			return BX.PopupMenu.getMenuById([this.listContainer.id, '_edit_item'].join(''));
		},

		createItemEditMenu: function(dataItem, menuId, node)
		{
			var menu;
			var menuItems = [
				{
					text: this.message('MIB_SET_HOME'),
					className: 'main-buttons-set-home menu-popup-no-icon'
				}
			];

			var id = dataItem.ID.replace(this.listContainer.id + '_', '');
			var currentItem = this.getItemById(id);

			if (this.isDisabled(currentItem))
			{
				menuItems.push({
					text: this.message('MIB_SET_SHOW'),
					className: 'main-buttons-set-hide menu-popup-no-icon'
				});
			}
			else
			{
				menuItems.push({
					text: this.message('MIB_SET_HIDE'),
					className: 'main-buttons-set-hide menu-popup-no-icon'
				});
			}

			var nodeRect = BX.pos(node);
			var menuParams = {
				menuId: menuId,
				anchor: node,
				menuItems: menuItems,
				settings: {
					'autoHide': true,
					'offsetTop': 0,
					'offsetLeft': (nodeRect.width / 2),
					'zIndex': 20,
					'angle': {
						'position': 'top',
						'offset': (nodeRect.width / 2)
					}
				}
			};

			menu = BX.PopupMenu.create(
				menuParams.menuId,
				menuParams.anchor,
				menuParams.menuItems,
				menuParams.settings
			);

			if (this.isVisibleItem(currentItem))
			{
				dataItem.NODE = currentItem;
			}
			else
			{
				dataItem.NODE = this.getItemAlias(currentItem);
			}

			this.editItemData = dataItem;

			if ('menuItems' in menu && BX.type.isArray(menu.menuItems))
			{
				menu.menuItems.forEach(function(current) {
					BX.bind(current.layout.item, 'click', BX.delegate(this._onDocumentClick, this));
				}, this);
			}

			BX.onCustomEvent(window, 'BX.Main.InterfaceButtons:onBeforeCreateEditMenu', [menu, dataItem, this]);

			this.editMenu = menu;

			return menu;
		},

		setHome: function()
		{
			var visibleItems = this.getVisibleItems();
			var firstVisibleItem = BX.type.isArray(visibleItems) && visibleItems.length > 0 ? visibleItems[0] : null;
			var firstItemNode = BX.findChild(firstVisibleItem, { tagName: 'a' }, true);

			if (!BX.type.isDomNode(firstItemNode))
			{
				return;
			}

			var firstPageLink = firstItemNode.getAttribute('href');
			if (firstPageLink.charAt(0) === '?')
			{
				firstPageLink = firstItemNode.pathname + firstItemNode.search;
			}

			if (!this.lastHomeLink)
			{
				this.lastHomeLink = firstPageLink;
			}

			if (this.lastHomeLink !== firstPageLink)
			{
				BX.userOptions.save('ui', this.listContainer.id, 'firstPageLink', firstPageLink);
				BX.onCustomEvent('BX.Main.InterfaceButtons:onFirstItemChange', [firstPageLink, firstVisibleItem]);
			}

			this.lastHomeLink = firstPageLink;
		},

		isEditButton: function(item)
		{
			return BX.hasClass(item, this.classEditItemButton);
		},

		isDragButton: function(item)
		{
			return BX.hasClass(item, this.classDragItemButton);
		},

		isResetSettingsButton: function(item)
		{
			return BX.hasClass(item, this.classSettingsResetButton);
		},


		/**
		 * Calculate container heigth
		 * @return {integer|float} Container height in pixels
		 */
		getContainerHeight: function()
		{
			var allItems = this.getAllItems();
			var heights, currentStyle;

			heights = [].map.call(allItems, function(current) {
				currentStyle = getComputedStyle(current);
				return (
					BX.height(current) +
					parseInt(currentStyle.marginTop) +
					parseInt(currentStyle.marginBottom)
				);
			});

			return Math.max.apply(Math, heights);
		},


		/**
		 * Sets container heigth
		 */
		setContainerHeight: function()
		{
			var containerHeight = this.getContainerHeight();
			BX.height(this.listContainer, containerHeight);
		},


		/**
		 * Sets license window params in this.licenseParams
		 * @param {object} params Params object
		 */
		setLicenseWindowParams: function(params)
		{
			this.licenseParams = params || {};
		},


		/**
		 * Gets message by id
		 * @method message
		 * @private
		 * @param  {string} messageId
		 * @return {string}
		 */
		message: function(messageId)
		{
			var result;
			try
			{
				result = this.messages[messageId];
			}
			catch (error)
			{
				result = '';
			}

			return result;
		},


		/**
		 * Sets custom classes
		 * @param  {object} classes
		 * @return {undefined}
		 */
		setCustomClasses: function(classes)
		{
			if (!BX.type.isPlainObject(classes))
			{
				return;
			}

			this.classItem = (classes.item || this.classItem);
			this.classItemSublink = (classes.itemSublink || this.classItemSublink);
			this.classItemText = (classes.itemText || this.classItemText);
			this.classItemCounter = (classes.itemCounter || this.classItemCounter);
			this.classItemIcon = (classes.itemIcon || this.classItemIcon);
			this.classItemMore = (classes.itemMore || this.classItemMore);
			this.classItemOver = (classes.itemOver || this.classItemOver);
			this.classItemActive = (classes.itemActive || this.classItemActive);
			this.classItemDisabled = (classes.itemDisabled || this.classItemDisabled);
			this.classOnDrag = (classes.onDrag || this.classOnDrag);
			this.classDropzone = (classes.dropzone || this.classDropzone);
			this.classSeporator = (classes.seporator || this.classSeporator);
			this.classSubmenuItem = (classes.submenuItem || this.classSubmenuItem);
			this.classSubmenu = (classes.submenu || this.classSubmenu);
			this.classSecret = (classes.secret || this.classSecret);
			this.classItemLocked = (classes.itemLocked || this.classItemLocked);
		},


		/**
		 * Sets list container
		 * @param {string} id container id
		 */
		setListContainer: function(container)
		{
			var firstButton = BX.findChild(container, {class: this.classItem}, true, false);

			if (BX.type.isDomNode(firstButton))
			{
				this.listContainer = firstButton.parentNode;
			}
		},


		/**
		 * Sets messages
		 * @param {object} messages Messages object
		 */
		setMessages: function(messages)
		{
			if (!BX.type.isPlainObject(messages))
			{
				return;
			}

			this.messages = messages;
		},


		/**
		 * Makes full item id
		 * @private
		 * @method makeFullItemId
		 * @param  {string} itemId
		 * @return {string}
		 */
		makeFullItemId: function(itemId)
		{
			if (!BX.type.isNotEmptyString(itemId))
			{
				return;
			}

			return [this.listContainer.id, itemId.replace('-', '_')].join('_');
		},


		/**
		 * Gets listContainer child by id
		 * @public
		 * @method getItemById
		 * @param  {string} itemId
		 * @return {object} dom node
		 */
		getItemById: function(itemId)
		{
			var resultItem = null;
			var realId;

			if (BX.type.isNotEmptyString(itemId))
			{
				realId = this.makeFullItemId(itemId);
				resultItem = BX.findChild(this.listContainer, {attribute: {id: realId}}, true, false);
			}

			return resultItem;
		},


		/**
		 * Finds counter object
		 * @private
		 * @method getItemCounterObject
		 * @param  {object} item
		 * @return {object} Counter dom node
		 */
		getItemCounterObject: function(item)
		{
			var result = null;

			if (BX.type.isDomNode(item))
			{
				result = BX.findChild(item, {class: this.classItemCounter}, true, false);
			}

			return result;
		},


		/**
		 * Sets item counter value
		 * @private
		 * @method setCounterValue
		 * @param {object} item
		 * @param {integer|float|string} value
		 */
		setCounterValue: function(item, value)
		{
			var counter = this.getItemCounterObject(item);

			if (BX.type.isDomNode(counter))
			{
				counter.innerText = value > 99 ? '99+' : (value > 0 ? value : '');
				item.dataset.counter = value;
			}

			this.updateMoreButtonCounter();
		},


		updateCounter: function(id, value)
		{
			var counter, item, data, alias;
			var items = this.getAllItems();

			if (BX.type.isArray(items))
			{
				items.forEach(function(current) {
					try {
						data = JSON.parse(BX.data(current, 'item'));
					} catch (err) {
						data = {};
					}

					if (BX.type.isPlainObject(data) && 'COUNTER_ID' in data && data.COUNTER_ID === id)
					{
						item = current;
					}
				}, this);
			}

			counter = this.getItemCounterObject(item);

			if (BX.type.isDomNode(counter))
			{
				item = this.getItem(counter);
				counter.innerText = value > 99 ? '99+' : (value > 0 ? value : '');
				item.dataset.counter = value;
			}

			alias = this.getItemAlias(item);

			if (BX.type.isDomNode(alias))
			{
				counter = this.getItemCounterObject(alias);

				if (BX.type.isDomNode(counter))
				{
					counter.innerText = value > 99 ? '99+' : (value > 0 ? value : '');
					alias.dataset.counter = value;
				}
			}

			this.updateMoreButtonCounter();
		},


		/**
		 * Sets counter value by item id
		 * @public
		 * @method setCounterValueByItemId
		 * @param {string} itemId
		 * @param {integer|Float} counterValue
		 */
		setCounterValueByItemId: function(itemId, counterValue)
		{
			var currentValue = counterValue !== null ? parseFloat(counterValue) : null;
			var currentItem, aliasItem;

			if (!BX.type.isNotEmptyString(itemId))
			{
				throw 'Bad first arg. Need string as item id';
			}

			if (currentValue !== null && !BX.type.isNumber(currentValue))
			{
				throw 'Bad two arg. Need number counter value - Integer, Float or string with number';
			}

			currentItem = this.getItemById(itemId);

			if (!BX.type.isDomNode(currentItem))
			{
				console.info('Not found node with id #' + itemId);
				return;
			}

			aliasItem = this.getItemAlias(currentItem);

			this.setCounterValue(currentItem, currentValue);
			this.setCounterValue(aliasItem, currentValue);
		},


		/**
		 * Gets counter value by item id
		 * @param  {string} itemId
		 * @return {number}
		 */
		getCounterValueByItemId: function(itemId)
		{
			var item, counter;
			var counterValue = NaN;

			if (!BX.type.isNotEmptyString(itemId))
			{
				throw 'Bad first arg. Need string item id';
			}
			else
			{
				item = this.getItemById(itemId);
				counterValue = this.dataValue(item, 'counter');
				counterValue = parseFloat(counterValue);

				if (!BX.type.isNumber(counterValue))
				{
					counter = this.getItemCounterObject(item);
					counterValue = parseFloat(counter.innerText);
				}
			}

			return counterValue;
		},

		setMoreButtonCounter: function(value)
		{
			var counter = this.getItemCounterObject(this.moreButton);
			var counterValue = value > 99 ? '99+' : (value > 0 ? value : '');

			counterValue = parseInt(counterValue);
			counterValue = BX.type.isNumber(counterValue) ? counterValue : '';

			counter.innerText = counterValue;
		},


		/**
		 * Binds on click on more button
		 * @method bindOnClickOnMoreButton
		 * @private
		 * @return {undefined}
		 */
		bindOnClickOnMoreButton: function()
		{
			BX.bind(
				this.moreButton,
				'click',
				BX.delegate(this._onClickMoreButton, this)
			);
		},


		/**
		 * Binds on tmp frame resize
		 * @method bindOnResizeFrame
		 * @private
		 * @return {undefined}
		 */
		bindOnResizeFrame: function()
		{
			maininterfacebuttonstmpframe.onresize = BX.throttle(this._onResizeHandler, 20, this);
		},

		createFrame: function()
		{
			this.tmp.frame = BX.create('iframe', {
				props: {
					height: '100%',
					width: '100%',
					id: 'maininterfacebuttons-tmp-frame',
					name: 'maininterfacebuttonstmpframe'
				},
				style: {
					position: 'absolute',
					'z-index': '-1',
					opacity: 0
				}
			});

			this.listContainer.parentNode.appendChild(this.tmp.frame);
		},


		/**
		 * Gets all items
		 * @public
		 * @method getAllItems
		 * @return {array} html collection
		 */
		getAllItems: function()
		{
			return BX.findChild(this.listContainer, {class: this.classItem}, true, true);
		},


		/**
		 * Gets only visible items
		 * @public
		 * @method getVisibleItems
		 * @return {array} html collection
		 */
		getVisibleItems: function()
		{
			var allItems = this.getAllItems();
			var self = this;
			var visibleItems = [];

			if (allItems && allItems.length)
			{
				visibleItems = [].filter.call(allItems, function(current)
				{
					return self.isVisibleItem(current) && !self.isDisabled(current);
				});
			}

			return visibleItems;
		},


		/**
		 * Gets only hidden items
		 * @public
		 * @method getHiddenItems
		 * @return {array} html collection
		 */
		getHiddenItems: function()
		{
			var allItems = this.getAllItems();
			var hiddenItems = [];
			var self = this;

			if (allItems && allItems.length)
			{
				hiddenItems = [].filter.call(allItems, function(current)
				{
					return !self.isVisibleItem(current) && !self.isDisabled(current);
				});
			}

			return hiddenItems;
		},


		/**
		 * Gets only disabled items,
		 * as showed after seporator in popup menu
		 * @public
		 * @method getDisabledItems
		 * @return {array} html collection
		 */
		getDisabledItems: function()
		{
			var allItems = this.getAllItems();
			var disabledItems = [];
			var self = this;

			if (allItems && allItems.length)
			{
				disabledItems = [].filter.call(allItems, function(current)
				{
					return self.isDisabled(current);
				});
			}

			return disabledItems;
		},


		/**
		 * Gets more button item
		 * @public
		 * @getMoreButton
		 * @return {object||null} more button object or null
		 */
		getMoreButton: function()
		{
			var allItems = this.getAllItems();
			var moreButton = null;
			var self = this;

			if (allItems && allItems.length)
			{
				[].map.call(allItems, function(current)
				{
					if (BX.hasClass(current, self.classItemMore))
					{
						moreButton = current;
						return;
					}
				});
			}

			return moreButton;
		},


		/**
		 * Gets last visible item
		 * @private
		 * @method getLastVisibleItem
		 * @return {object} last visible item object
		 */
		getLastVisibleItem: function()
		{
			var visibleItems = this.getVisibleItems();
			var lastVisibleItem = null;

			if (BX.type.isArray(visibleItems) && visibleItems.length)
			{
				lastVisibleItem = visibleItems[visibleItems.length - 1];
			}

			if (!BX.type.isDomNode(lastVisibleItem))
			{
				lastVisibleItem = null;
			}

			return lastVisibleItem;
		},


		/**
		 * Moves "more button" in the end of the list
		 * @public
		 * @method adjustMoreButtonPosition
		 * @return {undefined}
		 */
		adjustMoreButtonPosition: function()
		{
			var lastItem = this.getLastVisibleItem();
			var lastItemIsMoreButton = this.isMoreButton(lastItem);

			if (!lastItemIsMoreButton)
			{
				this.listContainer.insertBefore(this.moreButton, lastItem);
			}

			this.updateMoreButtonCounter();
		},


		/**
		 * Gets submenu id
		 * @private
		 * @method getSubmenuId
		 * @param  {boolean} isFull Set true if your need to get id for popup window
		 * @return {string} id
		 */
		getSubmenuId: function(isFull)
		{
			var id = '';

			if (BX.type.isDomNode(this.listContainer) &&
				BX.type.isNotEmptyString(this.listContainer.id))
			{
				id = this.submenuIdPrefix + this.listContainer.id;
			}

			if (isFull)
			{
				id = this.submenuWindowIdPrefix + id;
			}

			return id;
		},


		/**
		 * Gets submenu item content
		 * @private
		 * @method getSubmenuItemText
		 * @param  {object} item
		 * @return {string}
		 */
		getSubmenuItemText: function(item)
		{
			var text, counter, result;
			if (!BX.type.isDomNode(item))
			{
				return;
			}

			text = this.findChildrenByClassName(item, this.classItemText);
			counter = this.findChildrenByClassName(item, this.classItemCounter);

			if (BX.type.isDomNode(counter) && BX.type.isDomNode(text))
			{
				counter.dataset.counter = this.dataValue(item, 'counter');
				result = text.outerHTML + counter.outerHTML;
			}
			else
			{
				text = this.dataValue(item, 'text');
				counter = this.dataValue(item, 'counter');

				result = text;
			}

			return result;
		},


		/**
		 * Updates submenu position relative to more button
		 * @return {undefind}
		 */
		adjustSubmenuPosition: function()
		{
			var submenu, submenuWindow, bindElement, bindElementPosition;

			if (!this.isSubmenuShown)
			{
				return;
			}

			submenu = this.getSubmenu();

			if (submenu === null)
			{
				return;
			}

			submenuWindow = submenu.popupWindow;
			bindElement = document.getElementById('morebutton');
			bindElementPosition = submenuWindow.getBindElementPos(bindElement);

			submenuWindow.adjustPosition(bindElementPosition);
		},


		getLockedClass: function(item)
		{
			var result = '';
			if (BX.type.isDomNode(item) && this.isLocked(item))
			{
				result = this.classItemLocked;
			}

			return result;
		},


		/**
		 * Gets submenu items
		 * @private
		 * @method getSubmenuItems
		 * @return {array}
		 */
		getSubmenuItems: function()
		{
			var allItems = this.getAllItems();
			var hiddenItems = this.getHiddenItems();
			var disabledItems = this.getDisabledItems();
			var result = [];
			var self = this;
			var isActive, data, className;

			if (allItems.length)
			{
				[].map.call(allItems, function(current)
				{
					if (hiddenItems.indexOf(current) === -1 &&
						disabledItems.indexOf(current) === -1)
					{
						result.push({
							text: self.getSubmenuItemText(current),
							href: self.dataValue(current, 'url'),
							title: current.getAttribute('title'),
							className: [
								self.classSubmenuItem,
								self.getIconClass(current),
								self.classSecret,
								self.getAliasLink(current),
								self.getLockedClass(current)
							].join(' ')
						});
					}
				});
			}

			if (hiddenItems.length)
			{
				[].map.call(hiddenItems, function(current)
				{
					try {
						data = JSON.parse(self.dataValue(current, 'item'));
					} catch (err) {
						data = null;
					}

					className = [
						self.classSubmenuItem,
						self.getIconClass(current),
						self.getAliasLink(current),
						self.getLockedClass(current)
					];

					if (BX.type.isPlainObject(data) &&
						('IS_ACTIVE' in data && data.IS_ACTIVE === true || data.IS_ACTIVE === 'true' || data.IS_ACTIVE === 'Y'))
					{
						className.push(self.classItemActive);
					}

					result.push({
						text: self.getSubmenuItemText(current),
						href: self.dataValue(current, 'url'),
						title: current.getAttribute('title'),
						className: className.join(' ')
					});
				});
			}

			result.push({
				text: '<span>'+this.message('MIB_HIDDEN')+'</span>',
				className: [
					this.classSeporator,
					this.classSubmenuItem,
					this.classHiddenLabel,
				].join(' ')
			});

			if (!disabledItems.length)
			{
				result.push({
					text: '<span>'+this.message('MIB_NO_HIDDEN')+'</span>',
					className: [
						this.classSubmenuItem,
						this.classSubmenuNoHiddenItem
					].join(' ')
				});
			}

			if (disabledItems.length)
			{
				[].map.call(disabledItems, function(current)
				{
					try {
						data = JSON.parse(self.dataValue(current, 'item'));
					} catch (err) {
						data = null;
					}

					className = [
						self.classSubmenuItem,
						self.classItemDisabled,
						self.getIconClass(current),
						self.getAliasLink(current),
						self.getLockedClass(current)
					];

					if (BX.type.isPlainObject(data) &&
						('IS_ACTIVE' in data && data.IS_ACTIVE === true || data.IS_ACTIVE === 'true' || data.IS_ACTIVE === 'Y'))
					{
						className.push(self.classItemActive);
					}

					result.push({
						text: self.getSubmenuItemText(current),
						href: self.dataValue(current, 'url'),
						title: current.getAttribute('title'),
						className: className.join(' ')
					});
				});
			}

			result.push({
				text: '<span>'+this.message('MIB_MANAGE')+'</span>',
				className: [
					this.classSeporator,
					this.classSubmenuItem,
					this.classHiddenLabel,
					this.classManage
				].join(' ')
			});

			result.push({
				text: this.message('MIB_SETTING_MENU_ITEM'),
				className: [
					this.classSettingMenuItem,
					this.classSubmenuItem
				].join(' ')
			});

			result.push({
				text: this.message('MIB_APPLY_SETTING_MENU_ITEM'),
				className: [
					this.classSettingsApplyButton,
					this.classSubmenuItem
				].join(' ')
			});

			result.push({
				text: this.message('MIB_RESET_SETTINGS'),
				className: [this.classSettingsResetButton, this.classSubmenuItem].join(' ')
			});

			return result;
		},


		/**
		 * Gets BX.PopupMenu.show arguments
		 * @private
		 * @method getSubmenuArgs
		 * @return {array} Arguments
		 */
		getSubmenuArgs: function()
		{
			var menuId = this.getSubmenuId();
			var anchor = this.moreButton;
			var anchorPosition = BX.pos(anchor);
			var menuItems = this.getSubmenuItems();
			var params = {
				'autoHide': true,
				'offsetLeft': (anchorPosition.width / 2) - 80,
				'angle':
				{
					'position': 'top',
					'offset': 100
				},
				zIndex: 20,
				'events':
				{
					'onPopupClose': BX.delegate(this._onSubmenuClose, this)
				}
			};

			return [menuId, anchor, menuItems, params];
		},


		/**
		 * Controls the visibility of more button
		 * @return {undefined}
		 */
		visibleControllMoreButton: function()
		{
			var self = this;
			var hiddenItems = this.getHiddenItems();
			var disabledItems = this.getDisabledItems();
			var hiddenIsOnlyMoreButton = !(hiddenItems || []).some(function(current) {
				return !self.isMoreButton(current);
			});

			if ((!hiddenItems.length || hiddenIsOnlyMoreButton) && !disabledItems.length && this.dragItem === null)
			{
				this.closeSubmenu();
				return;
			}
		},


		/**
		 * Creates submenu
		 * @return {undefined}
		 */
		createSubmenu: function()
		{
			var menu = BX.PopupMenu.create.apply(BX.PopupMenu, this.getSubmenuArgs());
			this.dragAndDropInitInSubmenu();

			menu.menuItems.forEach(function(current) {
				BX.bind(current.layout.item, 'click', BX.delegate(this._onDocumentClick, this));
			}, this);

			return menu;
		},


		/**
		 * Shows submenu
		 * @public
		 * @method showSubmenu
		 * @return {undefined}
		 */
		showSubmenu: function()
		{
			var submenu = this.getSubmenu();

			if (submenu !== null)
			{
				submenu.popupWindow.show();
			}
			else
			{
				this.destroySubmenu();
				submenu = this.createSubmenu();
				submenu.popupWindow.show();
			}

			this.setSubmenuShown(true);
			this.activateItem(this.moreButton);

			if (this.isEditEnabled())
			{
				submenu.popupWindow.setAutoHide(false);
			}
		},


		/**
		 * Closes submenu
		 * @public
		 * @method closeSubmenu
		 * @return {undefined}
		 */
		closeSubmenu: function()
		{
			var submenu = this.getSubmenu();

			if (submenu === null)
			{
				return;
			}

			submenu.popupWindow.close();
			if (!this.isActiveInMoreMenu())
			{
				this.deactivateItem(this.moreButton);
			}
			this.setSubmenuShown(false);
		},


		/**
		 * Gets current submenu
		 * @public
		 * @method getSubmenu
		 * @return {object}
		 */
		getSubmenu: function()
		{
			return BX.PopupMenu.getMenuById(this.getSubmenuId());
		},


		/**
		 * Destroys submenu
		 * @private
		 * @method destroySubmenu
		 * @return {undefined}
		 */
		destroySubmenu: function()
		{
			BX.PopupMenu.destroy(this.getSubmenuId());
		},


		/**
		 * Refreshes submenu
		 * @public
		 * @method refreshSubmenu
		 * @return {undefined}
		 */
		refreshSubmenu: function()
		{
			var submenu = this.getSubmenu();
			var args;

			if (submenu === null)
			{
				return;
			}

			args = this.getSubmenuArgs();

			if (BX.type.isArray(args))
			{
				this.destroySubmenu();
				this.createSubmenu();
				this.showSubmenu();
			}
		},


		/**
		 * Sets value this.isSubmenuShown
		 * @private
		 * @method setSubmenuShown
		 * @param {boolean} value
		 */
		setSubmenuShown: function(value)
		{
			this.isSubmenuShown = false;
			if (BX.type.isBoolean(value))
			{
				this.isSubmenuShown = value;
			}
		},


		/**
		 * Adds class active for item
		 * @private
		 * @method activateItem
		 * @param  {object} item
		 * @return {undefined}
		 */
		activateItem: function(item)
		{
			if (!BX.type.isDomNode(item))
			{
				return;
			}

			if (!BX.hasClass(item, this.classItemActive))
			{
				BX.addClass(item, this.classItemActive);
			}
		},


		/**
		 * Removes class active for item
		 * @private
		 * @method deactivateItem
		 * @param  {object} item
		 * @return {undefined}
		 */
		deactivateItem: function(item)
		{
			if (!BX.type.isDomNode(item))
			{
				return;
			}

			if (BX.hasClass(item, this.classItemActive))
			{
				BX.removeClass(item, this.classItemActive);
			}
		},


		/**
		 * Gets current component settings
		 * @public
		 * @method getCurrentSettings
		 * @return {object}
		 */
		getCurrentSettings: function()
		{
			var allItems = this.getAllItems();
			var settings = {};
			var self = this;

			if (allItems && allItems.length)
			{
				[].map.call(allItems, function(current, index)
				{
					settings[current.id] = {
						sort: index,
						isDisabled: self.isDisabled(current)
					};
				});
			}

			return settings;
		},


		/**
		 * Saves current component settings
		 * @public
		 * @method saveSettings
		 * @return {undefined}
		 */
		saveSettings: function()
		{
			var settings = this.getCurrentSettings();
			var paramName = 'settings';
			var containerId;

			if (!BX.type.isPlainObject(settings))
			{
				return;
			}

			if (BX.type.isDomNode(this.listContainer))
			{
				if ('id' in this.listContainer)
				{
					containerId = this.listContainer.id;

					settings = JSON.stringify(settings);
					BX.userOptions.save('ui', containerId, paramName, settings);
					this.setHome();
				}
			}
		},

		resetSettings: function()
		{
			var button = null;
			var confirmPopup = BX.PopupWindowManager.create(
				this.listContainer.id + "_reset_popup",
				null,
				{
					content: this.message('MIB_RESET_ALERT'),
					autoHide: false,
					overlay: true,
					closeByEsc : true,
					closeIcon : true,
					draggable : { restrict : true},
					titleBar: this.message("MIB_RESET_SETTINGS"),
					buttons: [
						(button = new BX.PopupWindowButton({
							text: this.message("MIB_RESET_BUTTON"),
							className: 'popup-window-button-create',
							events: {
								click: function() {
									if (BX.hasClass(button.buttonNode, "popup-window-button-wait"))
									{
										return;
									}

									BX.addClass(button.buttonNode, "popup-window-button-wait");

									this.handleResetSettings(function(error, result) {
										if (error)
										{
											BX.removeClass(button.buttonNode, "popup-window-button-wait");
											confirmPopup.setContent(error);
										}
										else
										{
											var paramName = 'settings';
											BX.userOptions.save('ui', this.listContainer.id, paramName, JSON.stringify({}));
											BX.userOptions.save('ui', this.listContainer.id, 'firstPageLink', '');
											window.location.reload();
										}
									}.bind(this));
								}.bind(this)
							}
						})),
						new BX.PopupWindowButtonLink({
							text: this.message("MIB_CANCEL_BUTTON"),
							className: "popup-window-button-link-cancel",
							events: {
								click: function() {
									this.popupWindow.close();
								}
							}
						})
					]
				}
			);

			confirmPopup.show();
		},

		handleResetSettings: function(cb)
		{
			var promises = [];
			BX.onCustomEvent("BX.Main.InterfaceButtons:onBeforeResetMenu", [promises, this]);

			var promise = new BX.Promise();
			var firstPromise = promise;

			for (var i = 0; i < promises.length; i++)
			{
				promise = promise.then(promises[i]);
			}

			promise.then(
				function(result) {
					cb(null, result);
				},
				function(reason) {
					cb(reason, null);
				}
			);

			firstPromise.fulfill();
		},

		/**
		 * Moves alias buttons
		 * @private
		 * @method moveButtonAlias
		 * @param  {object} item
		 * @return {undefined}
		 */
		moveButtonAlias: function(item)
		{
			var aliasDragItem, aliasItem;

			if (!item || !this.dragItem)
			{
				return;
			}

			aliasDragItem = this.getItemAlias(this.dragItem);
			aliasItem = this.getItemAlias(item);

			if (this.isListItem(aliasDragItem))
			{
				if (!aliasItem)
				{
					this.listContainer.appendChild(aliasDragItem);
				}
				else
				{
					this.listContainer.insertBefore(aliasDragItem, aliasItem);
				}
			}
		},


		/**
		 * Moves drag item before item, or appendChild to container
		 * @private
		 * @method moveButton
		 * @param  {object} item
		 * @return {undefined}
		 */
		moveButton: function(item)
		{
			var submenuContainer;

			if (!BX.type.isDomNode(item) || !BX.type.isDomNode(this.dragItem))
			{
				return;
			}

			if (this.isListItem(item))
			{
				if (this.isDisabled(this.dragItem))
				{
					this.dragItem.dataset.disabled = 'false';
				}

				if (BX.type.isDomNode(item))
				{
					this.listContainer.insertBefore(this.dragItem, item);
				}
				else
				{
					this.listContainer.appendChild(this.dragItem);
				}
			}

			if (this.isSubmenuItem(item))
			{
				if (this.isDisabled(this.dragItem) && !this.isDisabled(item))
				{
					this.enableItem(this.dragItem);
				}
				submenuContainer = this.getSubmenuContainer();
				submenuContainer.insertBefore(this.dragItem, item);
			}
		},


		/**
		 * Gets submenu container
		 * @private
		 * @method getSubmenuContainer
		 * @return {object}
		 */
		getSubmenuContainer: function()
		{
			var submenu = this.getSubmenu();
			var result = null;

			if (submenu !== null)
			{
				result = submenu.itemsContainer;
			}

			return result;
		},


		/**
		 * Finds nextElementSibling for item by className
		 * @private
		 * @method findNextSiblingByClass
		 * @param  {object} item
		 * @param  {string} className
		 * @return {object}
		 */
		findNextSiblingByClass: function(item, className)
		{
			var sourceItem = item;
			for (; item && item !== document; item = item.nextSibling)
			{
				if (className)
				{
					if (BX.hasClass(item, className) &&
						item !== sourceItem)
					{
						return item;
					}
				}
				else
				{
					return null;
				}
			}

		},


		/**
		 * Finds parent node for item by className
		 * @private
		 * @method findParentByClassName
		 * @param  {object} item
		 * @param  {string} className
		 * @return {object}
		 */
		findParentByClassName: function(item, className)
		{
			for (; item && item !== document; item = item.parentNode)
			{
				if (className)
				{
					if (BX.hasClass(item, className))
					{
						return item;
					}
				}
				else
				{
					return null;
				}
			}
		},


		/**
		 * Finds children item by className
		 * @private
		 * @method findChildrenByClassName
		 * @param  {object} item
		 * @param  {string} className
		 * @return {object}
		 */
		findChildrenByClassName: function(item, className)
		{
			var result = null;
			if (BX.type.isDomNode(item) && BX.type.isNotEmptyString(className))
			{
				result = BX.findChildren(item,
				{
					className: className
				}, true);
				if (BX.type.isArray(result) && result.length)
				{
					result = result[0];
				}
			}

			return result;
		},


		/**
		 * Initialisere Drag And Drop
		 * @private
		 * @method dragAndDropInit
		 * @return {undefined}
		 */
		dragAndDropInit: function()
		{
			var allItems = this.getAllItems();
			var self = this;

			[].forEach.call(allItems, function(current, index)
			{
				if (!self.isSeporator(current) &&
					!self.isSettings(current) &&
					!self.isApplySettingsButton(current) &&
					!self.isResetSettingsButton(current))
				{
					current.draggable = true;
					current.tabindex = -1;
					current.dataset.link = 'item' + index;
					BX.bind(current, 'dragstart', BX.delegate(self._onDragStart, self));
					BX.bind(current, 'dragend', BX.delegate(self._onDragEnd, self));
					BX.bind(current, 'dragenter', BX.delegate(self._onDragEnter, self));
					BX.bind(current, 'dragover', BX.delegate(self._onDragOver, self));
					BX.bind(current, 'dragleave', BX.delegate(self._onDragLeave, self));
					BX.bind(current, 'drop', BX.delegate(self._onDrop, self));
				}

				BX.bind(current, 'mouseover', BX.delegate(self._onMouse, self));
				BX.bind(current, 'mouseout', BX.delegate(self._onMouse, self));
			});
		},


		/**
		 * Initialisere Drag And Drop for submenu items
		 * @private
		 * @method dragAndDropInitInSubmenu
		 * @return {undefined}
		 */
		dragAndDropInitInSubmenu: function()
		{
			var submenu = this.getSubmenu();
			var submenuItems = submenu.menuItems;
			var self = this;

			[].forEach.call(submenuItems, function(current)
			{
				if ((!self.isSeporator(current.layout.item) &&
					!self.isSettings(current.layout.item) &&
					!self.isApplySettingsButton(current.layout.item) &&
					!self.isResetSettingsButton(current.layout.item)))
				{
					current.layout.item.draggable = true;
					current.layout.item.dataset.sortable = true;
					BX.bind(current.layout.item, 'dragstart', BX.delegate(self._onDragStart, self));
					BX.bind(current.layout.item, 'dragenter', BX.delegate(self._onDragEnter, self));
					BX.bind(current.layout.item, 'dragover', BX.delegate(self._onDragOver, self));
					BX.bind(current.layout.item, 'dragleave', BX.delegate(self._onDragLeave, self));
					BX.bind(current.layout.item, 'dragend', BX.delegate(self._onDragEnd, self));
					BX.bind(current.layout.item, 'drop', BX.delegate(self._onDrop, self));
				}

				if (BX.hasClass(current.layout.item, self.classHiddenLabel) && !BX.hasClass(current.layout.item, self.classManage))
				{
					BX.bind(current.layout.item, 'dragover', BX.delegate(self._onDragOver, self));
				}
			});
		},


		/**
		 * Gets drag and drop event target element
		 * @private
		 * @method getItem
		 * @param  {object} event
		 * @return {object}
		 */
		getItem: function(eventOrItem)
		{
			var item = null;

			if (!BX.type.isDomNode(eventOrItem))
			{
				if ((!eventOrItem || !BX.type.isDomNode(eventOrItem.target)))
				{
					return;
				}
			}
			else
			{
				eventOrItem = {target: eventOrItem};
			}

			item = this.findParentByClassName(eventOrItem.target, this.classItem);

			if (!BX.type.isDomNode(item))
			{
				item = this.findParentByClassName(eventOrItem.target, this.classDefaultSubmenuItem);
			}

			return item;
		},


		/**
		 * Sets default opacity style
		 * @private
		 * @method setOpacity
		 * @param {object} item
		 */
		setOpacity: function(item)
		{
			if (!BX.type.isDomNode(item))
			{
				return;
			}

			BX.style(item, 'opacity', '.1');
		},


		/**
		 * Unsets opacity style
		 * @private
		 * @method unsetOpacity
		 * @param  {object} item
		 * @return {undefined}
		 */
		unsetOpacity: function(item)
		{
			if (!BX.type.isDomNode(item))
			{
				return;
			}

			BX.style(item, 'opacity', '1');
		},


		/**
		 * Updates link to submenu container object
		 * @private
		 * @method updateSubmenuContainer
		 * @return {undefined}
		 */
		setSubmenuContainer: function(container)
		{
			this.submenuContainer = container;
		},


		/**
		 * Sets drag styles
		 * @private
		 * @method setDragStyles
		 */
		setDragStyles: function()
		{
			BX.addClass(this.listContainer, this.classOnDrag);
			BX.addClass(BX(this.getSubmenuId(true)), this.classOnDrag);

			this.setOpacity(this.dragItem);
		},


		/**
		 * Unsets drag styles
		 * @private
		 * @method unsetDragStyles
		 * @return {undefined}
		 */
		unsetDragStyles: function()
		{
			var items = this.getAllItems();
			var submenu = this.getSubmenu();
			var self = this;

			if (items && items.length)
			{
				[].forEach.call(items, function(current)
				{
					self.unsetOpacity(current);
					BX.removeClass(current, 'over');
				});
			}

			if (submenu && ('menuItems' in submenu) &&
				BX.type.isArray(submenu.menuItems) &&
				submenu.menuItems.length)
			{

				[].forEach.call(submenu.menuItems, function(current)
				{
					self.unsetOpacity(current);
					BX.removeClass(current.layout.item, 'over');
				});
			}

			BX.removeClass(this.listContainer, this.classOnDrag);
			BX.removeClass(BX(this.getSubmenuId(true)), this.classOnDrag);
		},


		/**
		 * Gets icon class
		 * @private
		 * @method getIconClass
		 * @param  {object} item
		 * @return {string} className
		 */
		getIconClass: function(item)
		{
			var result = '';
			if (BX.type.isDomNode(item) &&
				('dataset' in item) &&
				('class' in item.dataset) &&
				(BX.type.isNotEmptyString(item.dataset.class)))
			{
				result = item.dataset.class;
			}

			return result;
		},


		/**
		 * Disables the element
		 * @private
		 * @method disableItem
		 * @param  {object} item
		 * @return {undefined}
		 */
		disableItem: function(item)
		{
			var alias = this.getItemAlias(item);
			if (item && ('dataset' in item))
			{
				item.dataset.disabled = 'true';
				if (alias)
				{
					alias.dataset.disabled = 'true';
				}
			}
		},


		/**
		 * Disables the element
		 * @private
		 * @method enableItem
		 * @param  {object} item
		 * @return {undefined}
		 */
		enableItem: function(item)
		{
			var alias;

			if (!BX.type.isDomNode(item))
			{
				return;
			}

			if (this.isSubmenuItem(item))
			{
				BX.removeClass(item, this.classItemDisabled);
				alias = this.getItemAlias(item);

				if (BX.type.isDomNode(alias))
				{
					alias.dataset.disabled = 'false';
				}

			}
		},


		/**
		 * Gets alias link
		 * @private
		 * @method getAliasLink
		 * @param  {object} item
		 * @return {string}
		 */
		getAliasLink: function(item)
		{
			return this.dataValue(item, 'link') || '';
		},


		/**
		 * Gets item alias
		 * @private
		 * @method getItemAlias
		 * @param  {object} item
		 * @return {object}
		 */
		getItemAlias: function(item)
		{
			var result = null;
			var self = this;
			var isSubmenuItem, isListItem, allItems;

			if (!BX.type.isDomNode(item))
			{
				return result;
			}

			allItems = this.getAllItems();
			isSubmenuItem = this.isSubmenuItem(item);
			isListItem = this.isListItem(item);

			if (!isSubmenuItem && !isListItem)
			{
				return result;
			}

			if (isSubmenuItem)
			{
				[].forEach.call(allItems, function(current)
				{
					if (BX.hasClass(item, self.getAliasLink(current)))
					{
						result = current;
					}
				});
			}

			if (isListItem)
			{
				result = BX.findChildren(document,
				{
					class: this.getAliasLink(item)
				}, true);
				if (BX.type.isArray(result) && result.length)
				{
					result = result[0];
				}
			}

			return result;
		},


		/**
		 * Hides item
		 * @private
		 * @method hideItem
		 * @param  {object} item
		 * @return {undefined}
		 */
		hideItem: function(item)
		{
			if (BX.type.isDomNode)
			{
				BX.addClass(item, this.classSecret);
			}
		},


		/**
		 * Shows item
		 * @private
		 * @method showItem
		 * @param  {object} item
		 * @return {undefined}
		 */
		showItem: function(item)
		{
			if (BX.type.isDomNode)
			{
				BX.removeClass(item, this.classSecret);
			}
		},


		/**
		 * Replaces drag item
		 * @private
		 * @method fakeDragItem
		 * @return {undefined}
		 */
		fakeDragItem: function()
		{
			var fakeDragItem = null;

			if (!BX.type.isDomNode(this.dragItem) || !BX.type.isDomNode(this.overItem))
			{
				return;
			}

			if (this.isDragToSubmenu())
			{
				fakeDragItem = this.getItemAlias(this.dragItem);
				if (fakeDragItem !== this.dragItem)
				{
					this.listContainer.appendChild(this.dragItem);
					this.dragItem = fakeDragItem;
					this.showItem(this.dragItem);
					this.adjustMoreButtonPosition();
					this.updateSubmenuItems();
					this.tmp.moved = false;
					this.tmp.movetToSubmenu = true;
					this.setOpacity(this.dragItem);
				}
			}

			if (this.isDragToList() && !this.tmp.movetToSubmenu)
			{
				fakeDragItem = this.getItemAlias(this.dragItem);
				if (fakeDragItem !== this.dragItem)
				{
					this.hideItem(this.dragItem);
					this.dragItem = fakeDragItem;
					this.adjustMoreButtonPosition();
					this.updateSubmenuItems();
					this.setOpacity(this.dragItem);
				}
			}

			this.tmp.movetToSubmenu = false;
		},


		/**
		 * Updates submenu items relative to hidden items
		 * @private
		 * @method updateSubmenuItems
		 * @return {undefined}
		 */
		updateSubmenuItems: function()
		{
			var hiddenItems = this.getHiddenItems();
			var disabledItems = this.getDisabledItems();
			var self = this;
			var items = [];
			var submenu, submenuItems, some;

			submenu = this.getSubmenu();

			if (submenu === null)
			{
				return;
			}

			submenuItems = submenu.menuItems;

			if (!BX.type.isArray(submenuItems) || !submenuItems.length)
			{
				return;
			}

			items = disabledItems.concat(hiddenItems);

			submenuItems.forEach(function(current)
			{
				some = [].some.call(items, function(someEl) {
					return (
						BX.hasClass(current.layout.item, self.dataValue(someEl, 'link')) ||
						self.isDisabled(current.layout.item) ||
						self.isSeporator(current.layout.item) ||
						self.isDropzone(current.layout.item)
					);
				});

				if (some || (self.isSettings(current.layout.item) ||
					self.isApplySettingsButton(current.layout.item) ||
					self.isResetSettingsButton(current.layout.item) ||
					self.isNotHiddenItem(current.layout.item) ||
					self.isSeporator(current.layout.item) ||
					current.layout.item === self.dragItem) &&
					!self.isMoreButton(current.layout.item))
				{
					self.showItem(current.layout.item);
				}
				else
				{
					self.hideItem(current.layout.item);
				}
			});
		},

		isNotHiddenItem: function(item)
		{
			return BX.hasClass(item, this.classSubmenuNoHiddenItem);
		},


		getNotHidden: function()
		{
			return BX.findChild(this.getSubmenuContainer(), {class: this.classSubmenuNoHiddenItem}, true, false);
		},


		/**
		 * Sets styles for overed item
		 * @private
		 * @method setOverStyles
		 * @param {object} item
		 */
		setOverStyles: function(item)
		{
			if (BX.type.isDomNode(item) && !BX.hasClass(item, this.classItemOver))
			{
				BX.addClass(item, this.classItemOver);
			}
		},


		/**
		 * Unsets styles for overed item
		 * @private
		 * @method unsetOverStyles
		 * @param  {object} item
		 * @return {undefined}
		 */
		unsetOverStyles: function(item)
		{
			if (BX.type.isDomNode(item) && BX.hasClass(item, this.classItemOver))
			{
				BX.removeClass(item, this.classItemOver);
			}
		},


		/**
		 * Gets value data attribute
		 * @private
		 * @method dataValue
		 * @param  {object} item
		 * @param  {string} key
		 * @return {string}
		 */
		dataValue: function(item, key)
		{
			var result = '';
			var tmpResult;

			if (BX.type.isDomNode(item))
			{
				tmpResult = BX.data(item, key);
				if (typeof(tmpResult) !== 'undefined')
				{
					result = tmpResult;
				}
			}

			return result;
		},


		/**
		 * Executes script
		 * @private
		 * @method execScript
		 * @param  {string} script
		 */
		/*jshint -W061 */
		execScript: function(script)
		{
			if (BX.type.isNotEmptyString(script))
			{
				eval(script);
			}
		},


		/**
		 * Shows license window
		 * @return {undefined}
		 */
		showLicenseWindow: function()
		{
			var popup;

			if (!B24.licenseInfoPopup)
			{
				return;
			}

			popup = B24.licenseInfoPopup;

			popup.init({
				B24_LICENSE_BUTTON_TEXT: this.message('MIB_LICENSE_BUY_BUTTON'),
				B24_TRIAL_BUTTON_TEXT: this.message('MIB_LICENSE_TRIAL_BUTTON'),
				IS_FULL_DEMO_EXISTS: this.licenseParams.isFullDemoExists,
				HOST_NAME: this.licenseParams.hostname,
				AJAX_URL: this.licenseParams.ajaxUrl,
				LICENSE_ALL_PATH: this.licenseParams.licenseAllPath,
				LICENSE_DEMO_PATH: this.licenseParams.licenseDemoPath,
				FEATURE_GROUP_NAME: this.licenseParams.featureGroupName,
				AJAX_ACTIONS_URL: this.licenseParams.ajaxActionsUrl,
				B24_FEATURE_TRIAL_SUCCESS_TEXT: this.message('MIB_LICENSE_WINDOW_TRIAL_SUCCESS_TEXT')
			});

			popup.show(
				'main-buttons',
				this.message('MIB_LICENSE_WINDOW_HEADER_TEXT'),
				this.message('MIB_LICENSE_WINDOW_TEXT')
			);

		},


		/**
		 * dragstart event handler
		 * @private
		 * @method _onDragStart
		 * @param  {object} event ondragstart event object
		 * @return {undefined}
		 */
		_onDragStart: function(event)
		{
			var visibleItems = this.getVisibleItems();
			var visibleItemsLength = BX.type.isArray(visibleItems) ? visibleItems.length : null;
			this.dragItem = this.getItem(event);

			if (!BX.type.isDomNode(this.dragItem))
			{
				return;
			}

			if (visibleItemsLength === 2 && this.isListItem(this.dragItem))
			{
				event.preventDefault();
				BX.onCustomEvent(window, 'BX.Main.InterfaceButtons:onHideLastVisibleItem', [this.dragItem, this]);
				return;
			}

			if (this.isMoreButton(this.dragItem) ||
				this.isSeporator(this.dragItem) ||
				this.isNotHiddenItem(this.dragItem))
			{
				event.preventDefault();
				return;
			}

			if (this.isSubmenuShown)
			{
				this.isSubmenuShownOnDragStart = true;
			}
			else
			{
				this.isSubmenuShownOnDragStart = false;
			}

			if (this.isListItem(this.dragItem))
			{
				this.showSubmenu();
			}

			this.setDragStyles();

			if (!this.isEditEnabled())
			{
				this.enableEdit();
			}
		},


		/**
		 * dragend event handleer
		 * @private
		 * @method _onDragEnd
		 * @param  {object} event dragend event object
		 * @return {undefined}
		 */
		_onDragEnd: function(event)
		{
			event.preventDefault();
			var item = this.getItem(event);
			var nextVisible, prevVisible;

			if (!BX.type.isDomNode(item))
			{
				return;
			}

			this.unsetDragStyles();

			if (!this.isSubmenuShownOnDragStart)
			{
				this.refreshSubmenu();
				if (!this.isEditEnabled())
				{
					this.closeSubmenu();
				}
			}
			else
			{
				this.refreshSubmenu();
			}


			nextVisible = BX.findNextSibling(this.dragItem, BX.delegate(function(node) {
				return this.isVisibleItem(node);
			}, this));

			prevVisible = BX.findPreviousSibling(this.dragItem, BX.delegate(function(node) {
				return this.isVisibleItem(node);
			}, this));


			if (BX.type.isDomNode(prevVisible) && (BX.hasClass(prevVisible, this.classHiddenLabel) || (this.isDisabled(prevVisible) && this.isSubmenuItem(prevVisible))) ||
				(BX.type.isDomNode(nextVisible) && BX.hasClass(nextVisible, this.classManage) || (this.isDisabled(nextVisible) && this.isSubmenuItem(nextVisible))))
			{
				this.disableItem(this.dragItem);
				this.refreshSubmenu();
			}

			if (this.isEditEnabled())
			{
				this.enableEdit();
				BX.show(this.getSettingsApplyButton());
				BX.hide(this.getSettingsButton());
			}
			else
			{
				this.disableEdit();
				BX.hide(this.getSettingsApplyButton());
				BX.show(this.getSettingsButton());
			}

			this.updateMoreButtonCounter();

			this.saveSettings();
			this.dragItem = null;
			this.overItem = null;
			this.tmp.moved = false;
		},


		updateMoreButtonCounter: function()
		{
			var hiddenItems, sumCount, counter, disabledItems;

			hiddenItems = this.getHiddenItems();
			disabledItems = this.getDisabledItems();
			hiddenItems = hiddenItems.concat(disabledItems);
			sumCount = 0;

			if (BX.type.isArray(hiddenItems))
			{
				hiddenItems.forEach(function(current) {
					sumCount += parseInt(this.dataValue(current, 'counter')) || 0;
				}, this);
			}

			if (BX.type.isNumber(sumCount))
			{
				this.setMoreButtonCounter(sumCount);
			}
		},


		/**
		 * dragenter event handler
		 * @private
		 * @method _onDragEnter
		 * @param  {object} event dragenter event object
		 * @return {undefined}
		 */
		_onDragEnter: function(event)
		{
			var item = this.getItem(event);

			if (BX.type.isDomNode(item) && this.isNotHiddenItem(item))
			{
				this.setOverStyles(item);
			}
		},


		/**
		 * dragover event handler
		 * @private
		 * @method _onDragOver
		 * @param  {object} event dragover event object
		 * @return {undefined}
		 */
		_onDragOver: function(event)
		{
			event.preventDefault();
			var nextSiblingItem = null;
			this.overItem = this.getItem(event);

			if (!BX.type.isDomNode(this.overItem) ||
				!BX.type.isDomNode(this.dragItem) ||
				this.overItem === this.dragItem ||
				this.isNotHiddenItem(this.overItem))
			{
				return;
			}

			this.fakeDragItem();

			if (this.isNext(event) && this.isGoodPosition(event) && !this.isMoreButton(this.overItem))
			{
				nextSiblingItem = this.findNextSiblingByClass(
					this.overItem,
					this.classItem
				);

				if (this.isMoreButton(nextSiblingItem) && !this.tmp.moved)
				{
					nextSiblingItem = nextSiblingItem.previousElementSibling;
					this.tmp.moved = true;
				}

				if (!BX.type.isDomNode(nextSiblingItem))
				{
					nextSiblingItem = this.findNextSiblingByClass(
						this.overItem,
						this.classSubmenuItem
					);
				}

				if (BX.type.isDomNode(nextSiblingItem))
				{
					this.moveButton(nextSiblingItem);
					this.moveButtonAlias(nextSiblingItem);
					this.adjustMoreButtonPosition();
					this.updateSubmenuItems();
				}
			}

			if ((!this.isNext(event) && this.isGoodPosition(event) && !this.isMoreButton(this.overItem)) ||
				(!this.isGoodPosition(event) && this.isMoreButton(this.overItem) && this.getVisibleItems().length === 1))
			{
				this.moveButton(this.overItem);
				this.moveButtonAlias(this.overItem);
				this.adjustMoreButtonPosition();
				this.updateSubmenuItems();
			}
		},


		/**
		 * dragleave event handler
		 * @private
		 * @method _onDragLeave
		 * @param  {object} event dragleave event object
		 * @return {undefined}
		 */
		_onDragLeave: function(event)
		{
			var item = this.getItem(event);

			if (BX.type.isDomNode(item))
			{
				this.unsetOverStyles(event.target);
			}
		},


		/**
		 * drop event handler
		 * @private
		 * @method _onDrop
		 * @param  {object} event drop event object
		 * @return {undefined}
		 */
		_onDrop: function(event)
		{
			var item = this.getItem(event);

			if (!BX.type.isDomNode(item))
			{
				return;
			}

			if (this.isNotHiddenItem(item) || this.isDisabled(item))
			{
				this.disableItem(this.dragItem);
				this.adjustMoreButtonPosition();
			}

			this.unsetDragStyles();

			event.preventDefault();
		},

		getIndex: function(collection, item)
		{
			return [].indexOf.call((collection || []), item);
		},


		/**
		 * submenuClose custom BX.PopupMenu event handler
		 * @private
		 * @method _onSubmenuClose
		 * @return {undefined}
		 */
		_onSubmenuClose: function()
		{
			this.setSubmenuShown(false);

			if (this.isEditEnabled())
			{
				this.activateItem(this.moreButton);
			}
			else
			{
				if (!this.isActiveInMoreMenu())
				{
					this.deactivateItem(this.moreButton);
				}
			}
		},


		/**
		 * resize window event handler
		 * @private
		 * @method _onResizeHandler
		 * @return {object} window resize event object
		 */
		_onResizeHandler: function()
		{
			this.adjustMoreButtonPosition();
			this.updateSubmenuItems();
		},


		/**
		 * click on more button event handler
		 * @private
		 * @method _onClickMoreButton
		 * @param  {object} event click event object
		 * @return {undefined}
		 */
		_onClickMoreButton: function(event)
		{
			event.preventDefault();
			this.showSubmenu();
		},


		/**
		 * mouseover and mouseout events handler
		 * @private
		 * @method _onMouse
		 * @param  {object} event mouseover and mouseout event object
		 * @return {undefined}
		 */
		_onMouse: function(event)
		{
			var item;

			if (!this.drgaItem)
			{
				item = this.getItem(event);
				if (event.type === 'mouseover' && !BX.hasClass(item, this.classItemOver))
				{
					BX.addClass(item, this.classItemOver);
				}

				if (event.type === 'mouseout' && BX.hasClass(item, this.classItemOver))
				{
					BX.removeClass(item, this.classItemOver);
				}
			}
		},


		/**
		 * click event handler
		 * @private
		 * @method _onClick
		 * @param  {object} event
		 * @return {undefined}
		 */
		_onClick: function(event)
		{

		},


		getSettingsResetButton: function()
		{
			return BX.findChild(this.getSubmenuContainer(), {class: this.classSettingsResetButton}, true, false);
		},


		_onScroll: function()
		{
			if (BX.style(this.pinContainer, 'position') === 'fixed')
			{
				this.closeSubmenu();
			}
		},


		/**
		 * Checks whether the item is disabled
		 * @private
		 * @method isDisabled
		 * @param  {object} item
		 * @return {boolean}
		 */
		isDisabled: function(item)
		{
			var result = false;

			if (BX.type.isDomNode(item))
			{
				result = (
					this.dataValue(item, 'disabled') === 'true' ||
					BX.hasClass(item, this.classItemDisabled)
				);
			}

			return result;
		},


		isSettings: function(item)
		{
			var result = false;

			if (BX.type.isDomNode(item))
			{
				result = BX.hasClass(item, this.classSettingMenuItem);
			}

			return result;
		},


		/**
		 * Checks whether the item is locked
		 * @private
		 * @method isLocked
		 * @param  {object}  item
		 * @return {boolean}
		 */
		isLocked: function(item)
		{
			var result = false;

			if (BX.type.isDomNode(item))
			{
				result = (
					this.dataValue(item, 'locked') === 'true' ||
					BX.hasClass(item, this.classItemLocked)
				);
			}

			return result;
		},


		/**
		 * Checks whether the item is dropzone
		 * @private
		 * @method isOvered
		 * @param  {object} item
		 * @return {boolean}
		 */
		isDropzone: function(item)
		{
			return BX.hasClass(item, this.classDropzone);
		},


		/**
		 * Checks whether the item is over
		 * @private
		 * @method isOvered
		 * @param  {object} item
		 * @return {boolean}
		 */
		isOvered: function(item)
		{
			return BX.hasClass(item, this.classItemOver);
		},


		/**
		 * Checks whether the overed item is next
		 * @private
		 * @method isNext
		 * @param  {object} event dragover event object
		 * @return {boolean}
		 */
		isNext: function(event)
		{
			var dragItemRect = this.dragItem.getBoundingClientRect();
			var overItemRect = this.overItem.getBoundingClientRect();
			var styles = getComputedStyle(this.dragItem);
			var dragItemMarginRight = parseInt(styles.marginRight.replace('px', ''));
			var result = null;

			if (this.isListItem(this.overItem))
			{
				result = (
					event.clientX > (overItemRect.left - dragItemMarginRight) && event.clientX > dragItemRect.right
				);
			}

			if (this.isSubmenuItem(this.overItem))
			{
				result = (
					event.clientY > dragItemRect.top
				);
			}

			return result;
		},


		/**
		 * Checks whether it is possible to move the item
		 * @private
		 * @method isGoodPosition
		 * @param  {object} event dragover event object
		 * @return {boolean}
		 */
		isGoodPosition: function(event)
		{
			var overItem = this.overItem;
			var overItemRect, result;

			if (!BX.type.isDomNode(overItem))
			{
				return;
			}

			overItemRect = overItem.getBoundingClientRect();

			if (this.isListItem(overItem))
			{
				result = (
					(this.isNext(event) && (event.clientX >= (overItemRect.left + (overItemRect.width / 2)))) ||
					(!this.isNext(event) && (event.clientX <= (overItemRect.left + (overItemRect.width / 2))))
				);
			}

			if (this.isSubmenuItem(overItem))
			{
				result = (
					(this.isNext(event) && (event.clientY >= (overItemRect.top + (overItemRect.height / 2)))) ||
					(!this.isNext(event) && (event.clientY <= (overItemRect.top + (overItemRect.height / 2))))
				);
			}

			return result;
		},


		/**
		 * Checks whether the item is a submenu item
		 * @private
		 * @method isSubmenuItem
		 * @param  {object} item
		 * @return {boolean}
		 */
		isSubmenuItem: function(item)
		{
			return BX.hasClass(item, this.classSubmenuItem);
		},


		/**
		 * Checks whether the item is visible
		 * @private
		 * @method isVisibleItem
		 * @param  {object}  item
		 * @return {boolean}
		 */
		isVisibleItem: function(item)
		{
			if (!BX.type.isDomNode(item))
			{
				return;
			}

			return item.offsetTop === 0;
		},


		/**
		 * Checks whether the item is more button
		 * @private
		 * @method isMoreButton
		 * @param  {object} item
		 * @return {boolean}
		 */
		isMoreButton: function(item)
		{
			var result = false;
			if (BX.type.isDomNode(item) && BX.hasClass(item, this.classItemMore))
			{
				result = true;
			}

			return result;
		},


		/**
		 * Checks whether the item is list item
		 * @private
		 * @method isListItem
		 * @param  {object} item
		 * @return {boolean}
		 */
		isListItem: function(item)
		{
			var result = false;

			if (BX.type.isDomNode(item) && BX.hasClass(item, this.classItem))
			{
				result = true;
			}

			return result;
		},


		/**
		 * Checks whether the item is sublink
		 * @private
		 * @method isSublink
		 * @param  {object}  item
		 * @return {boolean}
		 */
		isSublink: function(item)
		{
			var result = false;
			if (BX.type.isDomNode(item))
			{
				result = BX.hasClass(item, this.classItemSublink);
			}

			return result;
		},


		/**
		 * Checks whether the item is seporator
		 * @private
		 * @method isSeporator
		 * @param  {object}  item
		 * @return {boolean}
		 */
		isSeporator: function(item)
		{
			var result = false;
			if (BX.type.isDomNode(item))
			{
				result = BX.hasClass(item, this.classSeporator);
			}

			return result;
		},


		/**
		 * Checks that the element is dragged into the submenu
		 * @return {boolean}
		 */
		isDragToSubmenu: function()
		{
			return (!this.isSubmenuItem(this.dragItem) &&
				this.isSubmenuItem(this.overItem)
			);
		},


		/**
		 * Checks that the element is dragged into the list
		 * @return {boolean}
		 */
		isDragToList: function()
		{
			return (
				this.isSubmenuItem(this.dragItem) &&
				!this.isSubmenuItem(this.overItem)
			);
		}
	};
}



if (typeof(BX.Main.interfaceButtonsManager) === 'undefined')
{
	BX.Main.interfaceButtonsManager =
	{
		data: {},

		init: function(params)
		{
			var container = null;

			if (!BX.type.isPlainObject(params) || !('containerId' in params))
			{
				throw 'BX.Main.interfaceButtonsManager: containerId not set in params Object';
			}

			container = BX(params.containerId);

			if (BX.type.isDomNode(container))
			{
				this.data[params.containerId] = new BX.Main.interfaceButtons(container, params);
			}
			else
			{
				BX(BX.delegate(function() {
					container = BX(params.containerId);

					if (!BX.type.isDomNode(container))
					{
						throw 'BX.Main.interfaceButtonsManager: container is not dom node';
					}

					this.data[params.containerId] = new BX.Main.interfaceButtons(container, params);
				}, this));
			}
		},

		getById: function(containerId)
		{
			var result = null;

			if (BX.type.isString(containerId) && BX.type.isNotEmptyString(containerId))
			{
				try
				{
					result = this.data[containerId];
				}
				catch (e) {}
			}

			return result;
		},

		getObjects: function() {
			return this.data;
		}
	};
}