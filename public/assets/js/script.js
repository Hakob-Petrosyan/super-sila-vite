function openCloseBlock() {
    const openBlockBtn = document.querySelectorAll('[data-open-block-btn]');

    function toggleBlock(event, openBtn) {
        const openBlockWrapper = event.target.closest('[data-open-block-wrapper]');
        const openingBlock = openBlockWrapper.querySelector('[data-open-block]');

        openBlockWrapper.classList.toggle('open');

        if (openingBlock.style.maxHeight) {
            openingBlock.removeAttribute('style');
        } else {
            openingBlock.style.maxHeight = openingBlock.scrollHeight + 'px';
        }
    }

    openBlockBtn.forEach(openBtn => {
        openBtn?.addEventListener('click', (event) => {
            const hasMobileAccordion = openBtn.hasAttribute('data-mobile-accordion');

            // если есть атрибут mobileAccordion → работает только при ширине < 992
            if (hasMobileAccordion) {
                if (window.innerWidth < 992) {
                    toggleBlock(event, openBtn);
                }
            } else {
                toggleBlock(event, openBtn);
            }
        });
    });
}
function initTabs(){
    document.querySelectorAll('[data-tabs-block]').forEach(tabsBlock => {
        const panes = tabsBlock.querySelectorAll('[data-panes] [data-pane]');
        const containers = tabsBlock.querySelectorAll('[data-container]');
        panes.forEach((pane, index) => {
            pane.addEventListener('click', (e) => {
                panes.forEach(item => item.classList.remove('active'));
                containers.forEach(container => container.classList.remove('active'));
                pane.classList.add('active');
                containers[index].classList.add('active');

                const openingBlock = e.target.closest('[data-open-block]');
                if (openingBlock){
                    openingBlock.style.maxHeight = openingBlock.scrollHeight + 'px';
                }
            });

            if (panes.length > 0 && containers.length > 0) {
                panes[0].classList.add('active');
                containers[0].classList.add('active');
            }
        });
    });
}
function sliderInner(){
    const sliderInnerGroup = document.querySelectorAll('[data-sliderInner]');
    if (sliderInnerGroup) {
        sliderInnerGroup.forEach(sliderItem => {
            const sliderItemID = sliderItem.dataset.sliderInnerId;
            const slidesView = sliderItem.dataset.slidesView;
            const slidesViewTablet = sliderItem.dataset.slidesViewTablet;
            const slidesViewMobile = sliderItem.dataset.slidesViewMobile;
            const spaceBetween = sliderItem.dataset.spaceBetween;
            const tabletSpaceBetween = sliderItem.dataset.spaceBetweenTablet;
            const mobileSpaceBetween = sliderItem.dataset.spaceBetweenMobile;
            const grabCursor = sliderItem.dataset.grabCursor === 'true';

            const newSlider = `#${sliderItemID}`;

            new Swiper(newSlider, {
                grabCursor: grabCursor,
                navigation: {
                    nextEl: `#toRight_${sliderItemID}`,
                    prevEl: `#toLeft_${sliderItemID}`,
                },

                breakpoints: {
                    300: {
                        spaceBetween: mobileSpaceBetween,
                        slidesPerView: slidesViewMobile,
                    },
                    992: {
                        spaceBetween: tabletSpaceBetween,
                        slidesPerView: slidesViewTablet,
                    },
                    1300: {
                        spaceBetween: spaceBetween,
                        slidesPerView: slidesView,
                    },

                },
                pagination: {
                    el: `#swiper-pagination__${sliderItemID}`,
                    clickable: true,
                },
            })
        })
    }
}
function sliders(){
    const sliderGroup = document.querySelectorAll('[data-slider-group]');
    if (sliderGroup) {
        sliderGroup.forEach(sliderItem => {
            const sliderItemID = sliderItem.dataset.sliderId;
            const slidesView = sliderItem.dataset.slidesView;
            const slidesViewTablet = sliderItem.dataset.slidesViewTablet;
            const slidesViewMobile = sliderItem.dataset.slidesViewMobile;
            const spaceBetween = sliderItem.dataset.spaceBetween;
            const tabletSpaceBetween = sliderItem.dataset.spaceBetweenTablet;
            const mobileSpaceBetween = sliderItem.dataset.spaceBetweenMobile;
            const grabCursor = sliderItem.dataset.grabCursor === 'true';

            const newSlider = `#${sliderItemID}`;

            new Swiper(newSlider, {
                grabCursor: grabCursor,
                navigation: {
                    nextEl: `#toRight_${sliderItemID}`,
                    prevEl: `#toLeft_${sliderItemID}`,
                },

                breakpoints: {
                    300: {
                        spaceBetween: mobileSpaceBetween,
                        slidesPerView: slidesViewMobile,
                    },
                    992: {
                        spaceBetween: tabletSpaceBetween,
                        slidesPerView: slidesViewTablet,
                    },
                    1300: {
                        spaceBetween: spaceBetween,
                        slidesPerView: slidesView,
                    },

                },
                pagination: {
                    el: `#swiper-pagination__${sliderItemID}`,
                    clickable: true,
                },
            })
        })
    }
}
function initDoubleSliders() {
    new Swiper('[data-product-gallery-main-slide]', {
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 0,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        navigation: {
            nextEl: `#toRight_product-slider-max`,
            prevEl: `#toLeft_product-slider-max`,
        },
        thumbs: {
            swiper: {
                el: '[data-product-gallery-preview-slider]',
                mousewheel: true,
                spaceBetween: 12,
                direction: 'vertical',
                slidesPerView: 'auto',
                navigation: {
                    nextEl: `#toRight_product-slider-min`,
                    prevEl: `#toLeft_product-slider-min`,
                },
            },
        },
    });
}
function selectFiltersDimensions(){
    document.querySelectorAll('[data-filter-select-list]').forEach(list => {
        list.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                const selectItem = item.querySelector('[data-filter-select-list-item]')
                const value = selectItem.textContent.trim();
                const wrapper = item.closest('[data-filter-select-item]');
                const input = wrapper.querySelector('[data-filter-select-value]');
                const textSpan = wrapper.querySelector('[data-selected-value]');
                const  dimensionsList = wrapper.querySelector('[data-open-block]');
                input.value = value;
                textSpan.textContent = value;
                dimensionsList.removeAttribute('style');
                wrapper.classList.remove('open');
            });
        });
    });
}
function changeCardsView() {
    const allViewButtons = document.querySelectorAll('[data-view-grid-btn]');

    allViewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewType = btn.getAttribute('data-view-grid-btn');
            const wrapper = btn.closest('[data-view-type-wrapper]');
            const content = wrapper.querySelector('[data-view-type-content]');

            wrapper.querySelectorAll('[data-view-grid-btn]').forEach(button => {
                button.classList.remove('active');
            });

            btn.classList.add('active');

            content.classList.remove('view-grid', 'view-list');
            content.classList.add(viewType);
        });
    });
}
function ratingStars(){
    const ratingStars = document.querySelectorAll('[data-rating-stars]');
    ratingStars.forEach(ratingArea => {
        const stars = ratingArea.querySelectorAll('[data-rating-star]');
        let selectedValue = 0;

        stars.forEach(star => {
            const val = parseInt(star.dataset.value);

            star.addEventListener('click', () => {
                selectedValue = val;
                updateStars(selectedValue);
            });

            star.addEventListener('mouseenter', () => {
                updateStars(val);
            });

            star.addEventListener('mouseleave', () => {
                updateStars(selectedValue);
            });
        });

        function updateStars(value) {
            stars.forEach(st => {
                const starVal = parseInt(st.dataset.value);
                if (starVal <= value) {
                    st.classList.add('selected');
                } else {
                    st.classList.remove('selected');
                }
            });
        }
    });
}
function initOutsideClickClose() {
    document.addEventListener("click", (event) => {
        document.querySelectorAll("[data-outside-close]").forEach(block => {
            if (!block.contains(event.target)) {
                // удаляем классы
                block.classList.remove("open");

                // убираем max-height у вложенных элементов
                block.querySelector("[data-open-block]").removeAttribute("style");
            }
        });
    });
}

let popupTimer = null
function openPopUp() {
    const openPopupButtons = document.querySelectorAll('[data-open-popup]');
    openPopupButtons.forEach(openBtn => {
        openBtn.addEventListener('click', () => {
            const popupType = openBtn.dataset.openPopup;
            document.getElementById(`${popupType}`).classList.add('active');
            stopScrollBody()

            const autoClose = openBtn.dataset.autoClose;
            if (autoClose) {
                if (popupTimer) {
                    clearTimeout(popupTimer);
                    popupTimer = null;
                }
                popupTimer = setTimeout(() => {
                    closeAllOpen();
                }, autoClose);
            }
        });
    })

    const closePopupBtn = document.querySelectorAll('[data-close-popup]');
    closePopupBtn.forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const popup = e.target.closest('[data-popup]');
            popup.classList.remove('active');
            resetScrollBody()
            if (popupTimer) {
                clearTimeout(popupTimer);
                popupTimer = null;
            }
        })
    })
}
function closeByESC() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape'){
            closeAllOpen()
        }
    });
}
function closeByOverlay() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay?.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closeAllOpen()
        }
    });
}
function stopScrollBody() {
    const popupOverlay = document.getElementById('popupOverlay');
    document.body.classList.add('popup-open');
    popupOverlay.classList.add('active');
    popupOverlay.focus();
}
function resetScrollBody() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.remove('active');
    document.body.classList.remove('popup-open');
}
function closeAllOpen() {
    const popups = document.querySelectorAll('[data-popup]');
    popups.forEach(popup => {
        popup.classList.remove('active');
    })

    hideCatalog()
    resetScrollBody()
}
function openSearchResultBox() {
    const searchInput = document.querySelector('[data-search-bar-input]');
    const resultBox = document.querySelector('[data-search-bar-result]');
    const overlay = document.getElementById('searchOverlay');
    const searchBlock = document.querySelector('[data-search-block]');

    function openSearchResultBox() {
        if (searchInput.value.trim() !== "") {
            resultBox.classList.add('active');
            overlay.classList.add('active');
            searchBlock.classList.add('active');
            document.body.classList.add('popup-open');
        }
    }

    function closeSearchResultBox() {
        resultBox.classList.remove('active');
        overlay.classList.remove('active');
        searchBlock.classList.remove('active');
        if (window.innerWidth > 992){
            document.body.classList.remove('popup-open');
        }

    }

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() !== "") {
            openSearchResultBox();
        }
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === "") {
            closeSearchResultBox();
        } else {
            openSearchResultBox();
        }
    });

    overlay.addEventListener('click', closeSearchResultBox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchResultBox();
        }
    });

}
function openMobileSearch(){
    const mobileSearchBtn = document.querySelector('[data-mobile-search-btn]');
    mobileSearchBtn?.addEventListener('click', () => {
        const searchBlock = document.querySelector('[data-search-block]');
        searchBlock.classList.add('mobile-active');
        document.body.classList.add('popup-open');
    })
}
function closeMobileSearch(){
    const closeMobileSearch = document.querySelector('[data-close-mobile-search]');
    closeMobileSearch.addEventListener('click', () => {
        const searchBlock = closeMobileSearch.closest('[data-search-block]');
        const searchBarInput = searchBlock.querySelector('[data-search-bar-input]');
        const resultBox = document.querySelector('[data-search-bar-result]');
        searchBlock.classList.remove('active', 'mobile-active');
        resultBox.classList.remove('active');
        searchBarInput.value = '';
        document.body.classList.remove('popup-open');
    })
}
function copyClipboard() {
    document.querySelectorAll("[data-copy]").forEach(button => {
        button.addEventListener("click", () => {
            const valueToCopy = button.getAttribute("data-copy");

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(valueToCopy).then(() => {
                    showCopied(button);
                }).catch(err => {
                    console.error("Ошибка копирования: ", err);
                });
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = valueToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand("copy");
                    showCopied(button);
                } catch (err) {
                    console.error("execCommand copy error: ", err);
                }
                document.body.removeChild(textarea);
            }
        });
    });

    function showCopied(button) {
        // создаём всплывающий элемент
        const tooltip = document.createElement("span");
        tooltip.textContent = "Ссылка скопирована";
        tooltip.style.position = "absolute";
        tooltip.style.background = "#181818";
        tooltip.style.color = "#FFFFFF";
        tooltip.style.padding = "8px";
        tooltip.style.borderRadius = "8px";
        tooltip.style.fontSize = "12px";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.zIndex = "999";
        tooltip.style.transform = "translate(0, 100%)";
        tooltip.style.right = "0";
        tooltip.style.top = "0";
        tooltip.style.opacity = "0";
        tooltip.style.transition = "opacity 0.3s ease";

        // позиционирование относительно кнопки
        button.style.position = "relative";
        button.appendChild(tooltip);

        // анимация появления
        requestAnimationFrame(() => {
            tooltip.style.opacity = "1";
        });

        // удаление через 2 секунды
        setTimeout(() => {
            tooltip.style.opacity = "0";
            setTimeout(() => tooltip.remove(), 300);
        }, 2000);
    }
}

let hideTimeout;
function hideCatalogTimeout(overlay, catalog, button) {
    hideTimeout = setTimeout(() => {
        overlay.classList.remove('active');
        catalog.classList.remove('active');
        button.classList.remove('active');
        resetHeaderIndexZ()
    }, 2000); // 3 секунды
}
function hideCatalog() {
    const headerCatalogButton = document.querySelector('[data-header-catalog-button]');
    const dropdownCatalog = document.querySelector('[data-dropdowon-catalog]');
    const dropdownOverlay = document.querySelector('#dropdownOverlay');
    headerCatalogButton.classList.remove('active');
    dropdownCatalog.classList.remove('active');
    dropdownOverlay.classList.remove('active');
    resetHeaderIndexZ()
}
function initDropdownCatalog() {
    const headerCatalogButton = document.querySelector('[data-header-catalog-button]');
    const dropdownCatalog = document.querySelector('[data-dropdowon-catalog]');
    const dropdownCatalogContent = dropdownCatalog.querySelector('[data-dropdown-catalog-content]');
    const dropdownOverlay = document.querySelector('#dropdownOverlay');
    const mobileBtn = document.querySelector('[data-mobile-dropdown-catalog-btn]');
    const header = document.querySelector('header');

    if (!headerCatalogButton || !dropdownCatalog || !dropdownOverlay) return;

    function showCatalog() {
        clearTimeout(hideTimeout);
        dropdownOverlay.classList.add('active');
        dropdownCatalog.classList.add('active');
        headerCatalogButton.classList.add('active');
        header.style.zIndex = '100';
    }

    if (window.innerWidth < 992){
        mobileBtn.addEventListener('click', () => {
            dropdownCatalog.classList.add('active');
            document.body.classList.add('popup-open');
        })
    }else {
        headerCatalogButton.addEventListener('mouseenter', showCatalog);
        headerCatalogButton.addEventListener('mouseleave', () =>{
            hideCatalogTimeout(dropdownOverlay, dropdownCatalog, headerCatalogButton)
        });

        dropdownCatalogContent.addEventListener('mouseenter', showCatalog);
        dropdownCatalogContent.addEventListener('mouseleave', () => {
            hideCatalogTimeout(dropdownOverlay, dropdownCatalog, headerCatalogButton)
        });
        document.addEventListener('click', (e) => {
            const isInside = dropdownCatalogContent.contains(e.target) || headerCatalogButton.contains(e.target);
            if (!isInside) {
                hideCatalog()
            }
        });
    }
}
function initCloseMobileDropdownCatalog(){
    const closeMobileDropdownCatalog = document.querySelector('[data-close-mobile-dropdown-catalog]');
    closeMobileDropdownCatalog.addEventListener('click', (e) =>{
        const mobileDropdownCatalog = e.target.closest('[data-dropdowon-catalog]');
        mobileDropdownCatalog.classList.remove('active');
        document.body.classList.remove('popup-open');
    })
}
function resetHeaderIndexZ(){
    const header = document.querySelector('header');
    header.removeAttribute('style');
}
document.addEventListener('DOMContentLoaded', function() {
    openCloseBlock()
    initTabs()
    sliderInner()
    sliders()
    selectFiltersDimensions()
    changeCardsView()
    ratingStars()
    initDoubleSliders()
    initOutsideClickClose()
    openPopUp()
    closeByESC()
    closeByOverlay()
    openSearchResultBox()
    openMobileSearch()
    closeMobileSearch()
    copyClipboard()
    initDropdownCatalog()
    initCloseMobileDropdownCatalog()
});








