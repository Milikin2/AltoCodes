(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout((() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout((() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }), duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = functions_getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach(((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            }));
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach((tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                tabsContentItems.forEach(((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                }));
            }));
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) {
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    tabsTitles[index].setAttribute("data-tabs-title", "");
                    tabsContentItem.setAttribute("data-tabs-item", "");
                    if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                    tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                }));
            }
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                tabsContent.forEach(((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                }));
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    function uniqArray(array) {
        return array.filter((function(item, index, self) {
            return self.indexOf(item) === index;
        }));
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter((function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        }));
        if (media.length) {
            const breakpointsArray = [];
            media.forEach((item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            }));
            let mdQueries = breakpointsArray.map((function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            }));
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach((breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter((function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    }));
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                }));
                return mdQueriesArray;
            }
        }
    }
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if ("email" === formRequiredItem.dataset.required) {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label"
            };
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                    this.setLogging(`Проснулся, построил селектов: (${selectItems.length})`);
                } else this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
            }
        }
        getSelectClass(className) {
            return `.${className}`;
        }
        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.querySelector("select"),
                selectElement: selectItem.querySelector(this.getSelectClass(className))
            };
        }
        selectsInit(selectItems) {
            selectItems.forEach(((originalSelect, index) => {
                this.selectInit(originalSelect, index + 1);
            }));
            document.addEventListener("click", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("keydown", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusin", function(e) {
                this.selectsActions(e);
            }.bind(this));
            document.addEventListener("focusout", function(e) {
                this.selectsActions(e);
            }.bind(this));
        }
        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = document.createElement("div");
            selectItem.classList.add(this.selectClasses.classSelect);
            originalSelect.parentNode.insertBefore(selectItem, originalSelect);
            selectItem.appendChild(originalSelect);
            originalSelect.hidden = true;
            index ? originalSelect.dataset.id = index : null;
            if (this.getSelectPlaceholder(originalSelect)) {
                originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                if (this.getSelectPlaceholder(originalSelect).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                }
            }
            selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
            this.selectBuild(originalSelect);
            originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
            originalSelect.addEventListener("change", (function(e) {
                _this.selectChange(e);
            }));
        }
        selectBuild(originalSelect) {
            const selectItem = originalSelect.parentElement;
            selectItem.dataset.id = originalSelect.dataset.id;
            originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
            originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
            originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);
            originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
            originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
            this.selectDisabled(selectItem, originalSelect);
        }
        selectsActions(e) {
            const targetElement = e.target;
            const targetType = e.type;
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                if ("click" === targetType) {
                    if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                        const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                        const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                        this.optionAction(selectItem, originalSelect, optionItem);
                    } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                        const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                        this.optionAction(selectItem, originalSelect, optionItem);
                    }
                } else if ("focusin" === targetType || "focusout" === targetType) {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) "focusin" === targetType ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                } else if ("keydown" === targetType && "Escape" === e.code) this.selectsСlose();
            } else this.selectsСlose();
        }
        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : document;
            const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
            if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                this.selectСlose(selectActiveItem);
            }));
        }
        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.remove(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.dataset.speed);
            }
        }
        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            if (originalSelect.closest("[data-one-select]")) {
                const selectOneGroup = originalSelect.closest("[data-one-select]");
                this.selectsСlose(selectOneGroup);
            }
            if (!selectOptions.classList.contains("_slide")) {
                selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                _slideToggle(selectOptions, originalSelect.dataset.speed);
            }
        }
        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
            if (selectItemTitle) selectItemTitle.remove();
            selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
        }
        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
            if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                    document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                    if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                }
            }
            selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
            let pseudoAttribute = "";
            let pseudoAttributeClass = "";
            if (originalSelect.hasAttribute("data-pseudo-label")) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }
            this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
            if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span> </div>`; else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }
        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
            const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            selectOptionContentHTML += selectOptionData ? `</span>` : "";
            return selectOptionContentHTML;
        }
        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
            if (selectPlaceholder) return {
                value: selectPlaceholder.textContent,
                show: selectPlaceholder.hasAttribute("data-show"),
                label: {
                    show: selectPlaceholder.hasAttribute("data-label"),
                    text: selectPlaceholder.dataset.label
                }
            };
        }
        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            return {
                elements: selectedOptions.map((option => option)),
                values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                html: selectedOptions.map((option => this.getSelectElementContent(option)))
            };
        }
        getOptions(originalSelect) {
            let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
            let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;
                if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
                selectOptions.forEach((selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                }));
                selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
                return selectOptionsHTML;
            }
        }
        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }
        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.innerHTML = this.getOptions(originalSelect);
        }
        optionAction(selectItem, originalSelect, optionItem) {
            if (originalSelect.multiple) {
                optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                    originalSelectSelectedItem.removeAttribute("selected");
                }));
                const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                selectSelectedItems.forEach((selectSelectedItems => {
                    originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                }));
            } else {
                if (!originalSelect.hasAttribute("data-show-selected")) {
                    if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                    optionItem.hidden = true;
                }
                originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                this.selectAction(selectItem);
            }
            this.setSelectTitleValue(selectItem, originalSelect);
            this.setSelectChange(originalSelect);
        }
        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }
        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
            if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                let tempButton = document.createElement("button");
                tempButton.type = "submit";
                originalSelect.closest("form").append(tempButton);
                tempButton.click();
                tempButton.remove();
            }
            const selectItem = originalSelect.parentElement;
            this.selectCallback(selectItem, originalSelect);
        }
        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.classList.add(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
            } else {
                selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
            }
        }
        searchActions(selectItem) {
            this.getSelectElement(selectItem).originalSelect;
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
            const _this = this;
            selectInput.addEventListener("input", (function() {
                selectOptionsItems.forEach((selectOptionsItem => {
                    if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                }));
                true === selectOptions.hidden ? _this.selectAction(selectItem) : null;
            }));
        }
        selectCallback(selectItem, originalSelect) {
            document.dispatchEvent(new CustomEvent("selectCallback", {
                detail: {
                    select: originalSelect
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[select]: ${message}`) : null;
        }
    }
    modules_flsModules.select = new SelectConstructor({});
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const purchase__body = document.querySelector(".purchase-body__column-left");
    if (purchase__body) {
        purchase__body.addEventListener("click", (function(e) {
            if (e.target.classList.contains("tabs__title") && "prepayment" == e.target.id) {
                const delivery__container = document.querySelector(".purchase-body__box-delivery");
                delivery__container.insertAdjacentHTML("afterend", `<div class="purchase-body__box purchase-body__box-pay">\n                                <div class="heading-body">\n                                    <h2 class="heading">Варианты оплаты<span class="green">*</span></h2>\n                                </div>\n                                <div class="delivery__tabs">\n                                    <div data-tabs class="tabs">\n                                        <nav data-tabs-titles class="tabs__navigation">\n                                            <button type="button" id="individual" class="tabs__title _tab-active">Для физических\n                                                лиц</button>\n                                            <button type="button" id="entity" class="tabs__title">Для юридических лиц</button>\n                                        </nav>\n                                        <div data-tabs-body class="tabs__content">\n                                            <div class="tabs__body">\n                                                <div id="payments-tabs" class="tabgroup">\n                                                    <div class="tabgroup__body" id="tab4">\n                                                        <div class="payments__item">\n                                                            <input type="checkbox" id="paymentsTabs-03">\n                                                            <label for="paymentsTabs-03">\n                                                                <div class="img-convert">\n                                                                    <svg width="32" height="56" viewBox="0 0 32 56"\n                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                                        <path\n                                                                            d="M9.68886 39.5789H9.58566C7.83523 39.5789 6.40234 38.1503 6.40234 36.4051V6.5182C6.40234 4.77295 7.83523 3.3443 9.58566 3.3443H24.4702C26.2207 3.3443 27.6536 4.77295 27.6536 6.5182V36.4051C27.6536 38.1503 26.2207 39.5789 24.4702 39.5789H19"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M15.2339 33.437H27.6496M6.40234 33.437H9.68489H6.40234Z"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path d="M15.3848 36.5079H18.6713"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M9.68945 43.0576V33.1283C9.68945 31.6086 10.9358 30.366 12.46 30.366C13.9842 30.366 15.2305 31.6086 15.2305 33.1283V39.8718C15.2305 41.5577 16.0164 43.0061 17.4334 43.9243C19.2632 45.1115 20.3587 47.2604 20.1047 49.5558"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M24.4707 39.579C26.6776 41.815 26.9753 45.2184 25.3638 47.767C24.7525 48.7326 24.4707 49.7141 24.4707 50.8578V53.6518"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M8.04551 53.5489V52.1835C8.04551 50.6995 7.55729 49.4212 6.56102 48.3131L3.83019 45.2738C2.83789 44.1657 2.3457 42.8874 2.3457 41.4034V27.1446C2.3457 25.6684 2.82995 24.3981 3.81432 23.2939L6.40225 20.3892"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M24.1017 5.73859H9.95141C9.33104 5.73859 8.82812 6.29317 8.82812 6.97728V15.846C8.82812 16.5301 9.33104 17.0847 9.95141 17.0847H24.1017C24.7221 17.0847 25.225 16.5301 25.225 15.846V6.97728C25.225 6.29317 24.7221 5.73859 24.1017 5.73859Z"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path d="M8.82812 8.8927H25.225"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M19.8868 15.6362C20.9106 15.6362 21.7405 14.8088 21.7405 13.7881C21.7405 12.7674 20.9106 11.9399 19.8868 11.9399C18.8631 11.9399 18.0332 12.7674 18.0332 13.7881C18.0332 14.8088 18.8631 15.6362 19.8868 15.6362Z"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M20.8984 12.2407C22.1091 11.4532 23.7602 12.308 23.7602 13.7881C23.7602 15.2682 22.1091 16.123 20.8984 15.3355"\n                                                                            stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                    </svg>\n\n                                                                </div>\n                                                                <div class="text-convert">\n                                                                    <h4 class="title">Быстрая оплата - online</h4>\n                                                                    <p class="text-10">Оплата банковской картой на сайте\n                                                                    </p>\n                                                                </div>\n                                                            </label>\n                                                        </div>\n                                                        <div class="payments__item">\n                                                            <input type="checkbox" id="paymentsTabs-04">\n                                                            <label for="paymentsTabs-04">\n                                                                <div class="img-convert">\n                                                                    <svg width="41" height="42" viewBox="0 0 41 42"\n                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                                        <path\n                                                                            d="M9.94979 7.2113H5.46972C3.50478 7.2113 1.89844 8.75681 1.89844 10.6444C1.89844 12.532 3.50478 14.0775 5.46972 14.0775H33.2024V10.9622C33.2024 8.89753 31.4978 7.2113 29.4052 7.2113H27.9732"\n                                                                            stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M1.89844 10.6808V35.8747C1.89844 37.8594 3.53671 39.4801 5.54832 39.4801H33.3523C35.3614 39.4801 37.0021 37.8618 37.0021 35.8747V32.0025M37.0021 21.3974V17.8236C37.0021 15.7589 35.2976 14.0726 33.2049 14.0726H26.9048"\n                                                                            stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path fill-rule="evenodd" clip-rule="evenodd"\n                                                                            d="M39.16 21.3998H31.3199C28.3675 21.3998 25.9531 23.7848 25.9531 26.7011C25.9531 29.6175 28.3675 32.0024 31.3199 32.0024H39.16V21.3974V21.3998Z"\n                                                                            stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M30.6148 28.8775C31.8302 28.8775 32.8155 27.9042 32.8155 26.7036C32.8155 25.503 31.8302 24.5297 30.6148 24.5297C29.3994 24.5297 28.4141 25.503 28.4141 26.7036C28.4141 27.9042 29.3994 28.8775 30.6148 28.8775Z"\n                                                                            stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M8.21094 11.5688L17.3577 2.53355C18.2444 1.65768 19.6911 1.65768 20.5778 2.53355L29.7246 11.5688"\n                                                                            stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path\n                                                                            d="M13.8008 6.04431C16.8415 8.37349 21.0932 8.37349 24.1339 6.04431"\n                                                                            stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                        <path d="M18.9297 12.1025L20.9388 10.0427"\n                                                                            stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                            stroke-linecap="round"\n                                                                            stroke-linejoin="round" />\n                                                                    </svg>\n\n                                                                </div>\n                                                                <div class="text-convert">\n                                                                    <h4 class="title">Перевод по номеру счёта</h4>\n                                                                    <p class="text-10">Оплата с кошельков</p>\n                                                                </div>\n                                                            </label>\n                                                        </div>\n                                                        <div class="payments__item">\n                                                            <input type="checkbox" id="paymentsTabs-05">\n                                                            <label for="paymentsTabs-05">\n                                                                <div class="img-convert">\n                                                                    <svg width="75" class="sbp" height="40" viewBox="0 0 75 40"\n                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                                        <path\n                                                                            d="M63.8722 14.88V25.2H67.5013V17.92H70.969V25.2H74.5174V14.88H63.8722ZM57.098 14.32H60.4045L62.098 11.28H56.7755C52.9045 11.36 50.3238 14.64 50.3238 18.72C50.3238 23.52 53.0658 25.44 56.3722 25.44C59.7593 25.44 62.2593 23.28 62.1787 20.32C62.098 18 60.1625 15.76 57.5819 15.76C56.1303 15.76 54.7593 16.24 53.8722 17.12C53.9529 15.44 55.4045 14.32 57.098 14.32ZM56.2109 18.4C57.5013 18.4 58.3884 19.44 58.3884 20.64C58.3884 21.84 57.4206 22.8 56.1303 22.8C55.1625 22.8 54.0335 21.92 54.0335 20.64C54.0335 19.44 55.0013 18.4 56.2109 18.4V18.4ZM44.598 17.6C46.1303 17.52 47.4206 18.4 47.4206 18.4L48.7916 16C47.5819 15.12 46.3722 14.64 44.7593 14.64C41.2109 14.64 38.7109 17.52 38.7109 20C38.7109 22.96 41.3722 25.44 44.6787 25.44C46.1303 25.44 47.5819 24.96 48.7109 24.08L47.4206 21.6C47.4206 21.6 46.2109 22.4 44.598 22.4C43.5496 22.4 42.1787 21.52 42.1787 20C42.1787 18.48 43.5496 17.6 44.598 17.6V17.6Z"\n                                                                            fill="#1B0A40" />\n                                                                        <path\n                                                                            d="M10.0806 20L4.83871 23.04L0 31.44L19.9194 20H10.0806Z"\n                                                                            fill="#874691" />\n                                                                        <path\n                                                                            d="M25.1613 11.36L19.9194 14.4L15 22.8L34.9194 11.36H25.1613Z"\n                                                                            fill="#DA1844" />\n                                                                        <path\n                                                                            d="M19.9194 8.4L15 0V40L19.9194 31.6V8.4V8.4Z"\n                                                                            fill="#F9B229" />\n                                                                        <path\n                                                                            d="M15 0L19.9194 8.4L25.1613 11.36H35L15 0Z"\n                                                                            fill="#F07F1A" />\n                                                                        <path d="M15 17.2V40L19.9194 31.6V25.6L15 17.2Z"\n                                                                            fill="#72B22C" />\n                                                                        <path\n                                                                            d="M25.1613 28.64L19.9194 31.6L15 40L34.9194 28.64H25.1613Z"\n                                                                            fill="#00743E" />\n                                                                        <path\n                                                                            d="M0 8.64001V31.44L4.91935 23.04V16.96L0 8.64001Z"\n                                                                            fill="#5F5A94" />\n                                                                        <path\n                                                                            d="M15 17.2L0 8.64001L4.91935 16.96L25.1613 28.64H35L15 17.2Z"\n                                                                            fill="#0D90CD" />\n                                                                    </svg>\n\n                                                                </div>\n                                                            </label>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div class="tabs__body">\n                                                <div id="payments-tabs" class="tabgroup">\n                                                    <div class="tabgroup__body" id="tab4">\n                                                        <div class="payments__item">\n                                                            <input type="checkbox" id="paymentsTabs-06">\n                                                            <label for="paymentsTabs-06">\n                                                                <div class="img-convert">\n                                                                    <svg width="42" height="41" viewBox="0 0 42 41"\n                                                                        fill="none" xmlns="http://www.w3.org/2000/svg">\n                                                                        <g clip-path="url(#clip0_235_3563)">\n                                                                            <path\n                                                                                d="M10.9219 6.8538V4.83204C10.9219 2.38685 12.9376 0.39032 15.4001 0.39032H32.1028C33.2308 0.39032 34.2034 0.788504 35.0006 1.58207L40.4061 6.94353C41.2034 7.73429 41.6077 8.69891 41.6077 9.81775V36.1708C41.6077 38.6132 39.5919 40.6125 37.1295 40.6125H15.4029C12.9376 40.6125 10.9247 38.6132 10.9247 36.1708V33.7957"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                            <path\n                                                                                d="M38.5455 9.47562H35.2548C34.1267 9.47562 33.2051 8.56148 33.2051 7.44264V4.17865"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                            <path\n                                                                                d="M10.9217 30.9467C16.7379 30.9467 21.4528 26.2702 21.4528 20.5014C21.4528 14.7326 16.7379 10.0561 10.9217 10.0561C5.10556 10.0561 0.390625 14.7326 0.390625 20.5014C0.390625 26.2702 5.10556 30.9467 10.9217 30.9467Z"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                            <path\n                                                                                d="M13.2087 18.617C12.8242 16.1354 8.73331 16.2391 8.73331 18.6535C8.73331 21.3286 13.3302 19.7976 13.3302 22.3493C13.3302 24.5337 9.50795 24.9515 8.51562 22.6606"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                            <path d="M11.0996 16.8084V14.9745"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                            <path d="M11.0996 26.0283V24.1944"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                            <path d="M25.8008 21.3174H36.6457"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                            <path d="M25.8008 25.2964H36.6457"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                            <path d="M21.4648 29.2783H36.6466"\n                                                                                stroke="#B8B8B8"\n                                                                                stroke-miterlimit="22.9256"\n                                                                                stroke-linecap="round"\n                                                                                stroke-linejoin="round" />\n                                                                        </g>\n                                                                        <defs>\n                                                                            <clipPath id="clip0_235_3563">\n                                                                                <rect width="42" height="41"\n                                                                                    fill="white" />\n                                                                            </clipPath>\n                                                                        </defs>\n                                                                    </svg>\n                                                                </div>\n                                                                <div class="text-convert">\n                                                                    <h4 class="title">Оплата на расчётный счёт</h4>\n                                                                    <p class="text-10">Юридическим лицам</p>\n                                                                </div>\n                                                            </label>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n\n                                    \x3c!-- <div id="payments-tabs" class="tabgroup">\n                                        <div class="tabgroup__body" id="tab4">\n                                            <div class="payments__item">\n                                                <input type="checkbox" id="paymentsTabs-03">\n                                                <label for="paymentsTabs-03">\n                                                    <div class="img-convert">\n                                                        <svg width="32" height="56" viewBox="0 0 32 56" fill="none"\n                                                            xmlns="http://www.w3.org/2000/svg">\n                                                            <path\n                                                                d="M9.68886 39.5789H9.58566C7.83523 39.5789 6.40234 38.1503 6.40234 36.4051V6.5182C6.40234 4.77295 7.83523 3.3443 9.58566 3.3443H24.4702C26.2207 3.3443 27.6536 4.77295 27.6536 6.5182V36.4051C27.6536 38.1503 26.2207 39.5789 24.4702 39.5789H19"\n                                                                stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M15.2339 33.437H27.6496M6.40234 33.437H9.68489H6.40234Z"\n                                                                stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path d="M15.3848 36.5079H18.6713" stroke="#B8B8B8"\n                                                                stroke-miterlimit="22.9256" stroke-linecap="round"\n                                                                stroke-linejoin="round" />\n                                                            <path\n                                                                d="M9.68945 43.0576V33.1283C9.68945 31.6086 10.9358 30.366 12.46 30.366C13.9842 30.366 15.2305 31.6086 15.2305 33.1283V39.8718C15.2305 41.5577 16.0164 43.0061 17.4334 43.9243C19.2632 45.1115 20.3587 47.2604 20.1047 49.5558"\n                                                                stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M24.4707 39.579C26.6776 41.815 26.9753 45.2184 25.3638 47.767C24.7525 48.7326 24.4707 49.7141 24.4707 50.8578V53.6518"\n                                                                stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M8.04551 53.5489V52.1835C8.04551 50.6995 7.55729 49.4212 6.56102 48.3131L3.83019 45.2738C2.83789 44.1657 2.3457 42.8874 2.3457 41.4034V27.1446C2.3457 25.6684 2.82995 24.3981 3.81432 23.2939L6.40225 20.3892"\n                                                                stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M24.1017 5.73859H9.95141C9.33104 5.73859 8.82812 6.29317 8.82812 6.97728V15.846C8.82812 16.5301 9.33104 17.0847 9.95141 17.0847H24.1017C24.7221 17.0847 25.225 16.5301 25.225 15.846V6.97728C25.225 6.29317 24.7221 5.73859 24.1017 5.73859Z"\n                                                                stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path d="M8.82812 8.8927H25.225" stroke="#B8B8B8"\n                                                                stroke-miterlimit="22.9256" stroke-linecap="round"\n                                                                stroke-linejoin="round" />\n                                                            <path\n                                                                d="M19.8868 15.6362C20.9106 15.6362 21.7405 14.8088 21.7405 13.7881C21.7405 12.7674 20.9106 11.9399 19.8868 11.9399C18.8631 11.9399 18.0332 12.7674 18.0332 13.7881C18.0332 14.8088 18.8631 15.6362 19.8868 15.6362Z"\n                                                                stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M20.8984 12.2407C22.1091 11.4532 23.7602 12.308 23.7602 13.7881C23.7602 15.2682 22.1091 16.123 20.8984 15.3355"\n                                                                stroke="#B8B8B8" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                        </svg>\n\n                                                    </div>\n                                                    <div class="text-convert">\n                                                        <h4 class="title">Быстрая оплата - online</h4>\n                                                        <p class="text-10">Оплата банковской картой на сайте</p>\n                                                    </div>\n                                                </label>\n                                            </div>\n                                            <div class="payments__item">\n                                                <input type="checkbox" id="paymentsTabs-04">\n                                                <label for="paymentsTabs-04">\n                                                    <div class="img-convert">\n                                                        <svg width="41" height="42" viewBox="0 0 41 42" fill="none"\n                                                            xmlns="http://www.w3.org/2000/svg">\n                                                            <path\n                                                                d="M9.94979 7.2113H5.46972C3.50478 7.2113 1.89844 8.75681 1.89844 10.6444C1.89844 12.532 3.50478 14.0775 5.46972 14.0775H33.2024V10.9622C33.2024 8.89753 31.4978 7.2113 29.4052 7.2113H27.9732"\n                                                                stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M1.89844 10.6808V35.8747C1.89844 37.8594 3.53671 39.4801 5.54832 39.4801H33.3523C35.3614 39.4801 37.0021 37.8618 37.0021 35.8747V32.0025M37.0021 21.3974V17.8236C37.0021 15.7589 35.2976 14.0726 33.2049 14.0726H26.9048"\n                                                                stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path fill-rule="evenodd" clip-rule="evenodd"\n                                                                d="M39.16 21.3998H31.3199C28.3675 21.3998 25.9531 23.7848 25.9531 26.7011C25.9531 29.6175 28.3675 32.0024 31.3199 32.0024H39.16V21.3974V21.3998Z"\n                                                                stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M30.6148 28.8775C31.8302 28.8775 32.8155 27.9042 32.8155 26.7036C32.8155 25.503 31.8302 24.5297 30.6148 24.5297C29.3994 24.5297 28.4141 25.503 28.4141 26.7036C28.4141 27.9042 29.3994 28.8775 30.6148 28.8775Z"\n                                                                stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M8.21094 11.5688L17.3577 2.53355C18.2444 1.65768 19.6911 1.65768 20.5778 2.53355L29.7246 11.5688"\n                                                                stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path\n                                                                d="M13.8008 6.04431C16.8415 8.37349 21.0932 8.37349 24.1339 6.04431"\n                                                                stroke="#00AA2E" stroke-miterlimit="22.9256"\n                                                                stroke-linecap="round" stroke-linejoin="round" />\n                                                            <path d="M18.9297 12.1025L20.9388 10.0427" stroke="#00AA2E"\n                                                                stroke-miterlimit="22.9256" stroke-linecap="round"\n                                                                stroke-linejoin="round" />\n                                                        </svg>\n\n                                                    </div>\n                                                    <div class="text-convert">\n                                                        <h4 class="title">Перевод по номеру счёта</h4>\n                                                        <p class="text-10">Оплата с кошельков</p>\n                                                    </div>\n                                                </label>\n                                            </div>\n                                            <div class="payments__item">\n                                                <input type="checkbox" id="paymentsTabs-05">\n                                                <label for="paymentsTabs-05">\n                                                    <div class="img-convert">\n                                                        <svg width="75" height="40" viewBox="0 0 75 40" fill="none"\n                                                            xmlns="http://www.w3.org/2000/svg">\n                                                            <path\n                                                                d="M63.8722 14.88V25.2H67.5013V17.92H70.969V25.2H74.5174V14.88H63.8722ZM57.098 14.32H60.4045L62.098 11.28H56.7755C52.9045 11.36 50.3238 14.64 50.3238 18.72C50.3238 23.52 53.0658 25.44 56.3722 25.44C59.7593 25.44 62.2593 23.28 62.1787 20.32C62.098 18 60.1625 15.76 57.5819 15.76C56.1303 15.76 54.7593 16.24 53.8722 17.12C53.9529 15.44 55.4045 14.32 57.098 14.32ZM56.2109 18.4C57.5013 18.4 58.3884 19.44 58.3884 20.64C58.3884 21.84 57.4206 22.8 56.1303 22.8C55.1625 22.8 54.0335 21.92 54.0335 20.64C54.0335 19.44 55.0013 18.4 56.2109 18.4V18.4ZM44.598 17.6C46.1303 17.52 47.4206 18.4 47.4206 18.4L48.7916 16C47.5819 15.12 46.3722 14.64 44.7593 14.64C41.2109 14.64 38.7109 17.52 38.7109 20C38.7109 22.96 41.3722 25.44 44.6787 25.44C46.1303 25.44 47.5819 24.96 48.7109 24.08L47.4206 21.6C47.4206 21.6 46.2109 22.4 44.598 22.4C43.5496 22.4 42.1787 21.52 42.1787 20C42.1787 18.48 43.5496 17.6 44.598 17.6V17.6Z"\n                                                                fill="#1B0A40" />\n                                                            <path\n                                                                d="M10.0806 20L4.83871 23.04L0 31.44L19.9194 20H10.0806Z"\n                                                                fill="#874691" />\n                                                            <path\n                                                                d="M25.1613 11.36L19.9194 14.4L15 22.8L34.9194 11.36H25.1613Z"\n                                                                fill="#DA1844" />\n                                                            <path d="M19.9194 8.4L15 0V40L19.9194 31.6V8.4V8.4Z"\n                                                                fill="#F9B229" />\n                                                            <path d="M15 0L19.9194 8.4L25.1613 11.36H35L15 0Z"\n                                                                fill="#F07F1A" />\n                                                            <path d="M15 17.2V40L19.9194 31.6V25.6L15 17.2Z"\n                                                                fill="#72B22C" />\n                                                            <path\n                                                                d="M25.1613 28.64L19.9194 31.6L15 40L34.9194 28.64H25.1613Z"\n                                                                fill="#00743E" />\n                                                            <path d="M0 8.64001V31.44L4.91935 23.04V16.96L0 8.64001Z"\n                                                                fill="#5F5A94" />\n                                                            <path\n                                                                d="M15 17.2L0 8.64001L4.91935 16.96L25.1613 28.64H35L15 17.2Z"\n                                                                fill="#0D90CD" />\n                                                        </svg>\n\n                                                    </div>\n                                                </label>\n                                            </div>\n                                        </div>\n                                    </div> --\x3e\n                                </div>\n                            </div>`);
                tabs();
            } else if (e.target.classList.contains("tabs__title") && "payment" == e.target.id) {
                const delivery__container = document.querySelector(".purchase-body__box-delivery");
                delivery__container.nextElementSibling.remove();
                const contacts = document.querySelector(".purchase-body__box-data");
                contacts.innerHTML = "";
                contacts.insertAdjacentHTML("afterbegin", `<div class="heading-body">\n                                    <h2 class="heading">Контактные данные <span class="green">*</span></h2>\n                                </div>\n                                <p class="description-text">Обозначьте количество бонусов, которые Вы хотите списать при\n                                    оформлении заказа</p>\n                                <div class="purchase__ucontacts">\n                                    <form action="#">\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">Фамилия<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">Имя<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col2">\n                                                <span class="title">Телефон<span class="green">*</span></span>\n                                                <input type="phone">\n                                            </div>\n                                            <div class="purchase__ucontacts-col2">\n                                                <span class="title">Email<span class="green">*</span></span>\n                                                <input type="Email">\n                                            </div>\n                                            <div class="purchase__ucontacts-col checkmark-push-body">\n                                                <input type="checkbox" id="checkmark-push-sms">\n                                                <label for="checkmark-push-sms" class="checkmark-push">Включить\n                                                    СМС-уведомления о заказе</label>\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col6">\n                                                <span class="title">Адрес<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col1">\n                                                <span class="title">Индекс<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                        </div>\n                                        <div class="heading-body">\n                                            <h2 class="heading">Комментарии к заказу</h2>\n                                        </div>\n                                        <p class="text-16">\n                                            Что ещё нам необходимо учесть при доставке заказа?\n                                        </p>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col">\n                                                <textarea name=""></textarea>\n                                            </div>\n                                        </div>\n                                        <div class="form-description"><span class="green">*</span> Обязательное поле\n                                        </div>\n                                    </form>\n                                </div>`);
            } else if (e.target.classList.contains("tabs__title") && "entity" == e.target.id) {
                const contacts = document.querySelector(".purchase-body__box-data");
                contacts.innerHTML = "";
                contacts.insertAdjacentHTML("afterbegin", `\n                                <div class="heading-body">\n                                    <h2 class="heading">Контактные данные <span class="green">*</span></h2>\n                                </div>\n                                <p class="description-text">Обозначьте количество бонусов, которые Вы хотите списать при\n                                    оформлении заказа</p>\n                                <div class="purchase__ucontacts">\n                                    <form action="#" id="purchase5">\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">Фамилия<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">Имя<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">Отчество<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col2">\n                                                <span class="title">Телефон<span class="green">*</span></span>\n                                                <input type="phone">\n                                            </div>\n                                            <div class="purchase__ucontacts-col2">\n                                                <span class="title">Email<span class="green">*</span></span>\n                                                <input type="Email">\n                                            </div>\n                                            <div class="purchase__ucontacts-col checkmark-push-body">\n                                                <input type="checkbox" id="checkmark-push-sms-yuridik">\n                                                <label for="checkmark-push-sms-yuridik" class="checkmark-push">Включить\n                                                    СМС-уведомления о\n                                                    заказе</label>\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col6">\n                                                <span class="title">Адрес<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">Индекс<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col6">\n                                                <span class="title">Наименование организации покупателя<span\n                                                        class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col2">\n                                                <span class="title">ИНН организации покупателя<span\n                                                        class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col2">\n                                                <span class="title">КПП организации покупателя<span\n                                                        class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col checkmark-push-body">\n                                                <input type="checkbox" id="checkmark-push-sms-yuridik">\n                                                <label for="checkmark-push-sms-yuridik" class="checkmark-push">Включить\n                                                    СМС-уведомления о\n                                                    заказе</label>\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col6">\n                                                <span class="title">Юридический адрес организации покупателя<span\n                                                        class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">ИИН<span class="green">*</span></span>\n                                                <input type="text">\n                                                <p class="input-description text-14">Обязательно для резидентов\n                                                    Казахстана</p>\n                                            </div>\n                                        </div>\n                                        <div class="heading-body">\n                                            <h2 class="heading">Комментарии к заказу</h2>\n                                        </div>\n                                        <p class="text-16">\n                                            Что ещё нам необходимо учесть при доставке заказа?\n                                        </p>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col">\n                                                <textarea name=""></textarea>\n                                            </div>\n                                        </div>\n                                        <div class="form-description"><span class="green">*</span> Обязательное поле\n                                        </div>\n                                    </form>\n                                </div>`);
            } else if (e.target.classList.contains("tabs__title") && "individual" == e.target.id) {
                const contacts = document.querySelector(".purchase-body__box-data");
                contacts.innerHTML = "";
                contacts.insertAdjacentHTML("afterbegin", `<div class="heading-body">\n                                    <h2 class="heading">Контактные данные <span class="green">*</span></h2>\n                                </div>\n                                <p class="description-text">Обозначьте количество бонусов, которые Вы хотите списать при\n                                    оформлении заказа</p>\n                                <div class="purchase__ucontacts">\n                                    <form action="#">\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">Фамилия<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col3">\n                                                <span class="title">Имя<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col2">\n                                                <span class="title">Телефон<span class="green">*</span></span>\n                                                <input type="phone">\n                                            </div>\n                                            <div class="purchase__ucontacts-col2">\n                                                <span class="title">Email<span class="green">*</span></span>\n                                                <input type="Email">\n                                            </div>\n                                            <div class="purchase__ucontacts-col checkmark-push-body">\n                                                <input type="checkbox" id="checkmark-push-sms">\n                                                <label for="checkmark-push-sms" class="checkmark-push">Включить\n                                                    СМС-уведомления о заказе</label>\n                                            </div>\n                                        </div>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col6">\n                                                <span class="title">Адрес<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                            <div class="purchase__ucontacts-col1">\n                                                <span class="title">Индекс<span class="green">*</span></span>\n                                                <input type="text">\n                                            </div>\n                                        </div>\n                                        <div class="heading-body">\n                                            <h2 class="heading">Комментарии к заказу</h2>\n                                        </div>\n                                        <p class="text-16">\n                                            Что ещё нам необходимо учесть при доставке заказа?\n                                        </p>\n                                        <div class="purchase__ucontacts-row">\n                                            <div class="purchase__ucontacts-col">\n                                                <textarea name=""></textarea>\n                                            </div>\n                                        </div>\n                                        <div class="form-description"><span class="green">*</span> Обязательное поле\n                                        </div>\n                                    </form>\n                                </div>`);
            } else if (e.target.classList.contains("select__option")) {
                const region__select = document.querySelector(".select");
                region__select.classList.add("select__item-choosen");
            }
        }));
        const region__select = document.querySelector(".select");
        const region__select__body = document.querySelector(".select__body");
        region__select__body.insertAdjacentHTML("afterbegin", `<span class="pseudo__placeholder">Пермь, Пермский край, Россия</span>`);
        if (region__select) if (!region__select.classList.contains("select__item-choosen")) {
            const region__input = document.querySelector(".select__input");
            region__input.addEventListener("input", (function() {
                const pseudo__placeholder = document.querySelector(".pseudo__placeholder");
                if (pseudo__placeholder) pseudo__placeholder.remove();
                if (0 == region__input.value.length) region__select__body.insertAdjacentHTML("afterbegin", `<span class="pseudo__placeholder">Пермь, Пермский край, Россия</span>`);
            }));
            region__input.placeholder = "";
        }
    }
    window["FLS"] = true;
    isWebp();
    tabs();
})();