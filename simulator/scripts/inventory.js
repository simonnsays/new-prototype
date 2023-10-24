import SearchBar from "./search.js"
import Platform from "./platform.js"

class Inventory extends Platform{
    constructor(domElements, ui) {
        super(domElements, ui)
        this.itemsArea = domElements.getInvItemsContainer() // inv items area

        // MODAL AREA
        this.modal =  domElements.getInv() // inv modals area
        this.modal.isOpen = false
        this.invBtns = domElements.getInvButtons()

        this.invBtns.forEach(button => {
            button.addEventListener('click', () => {
                this.handleModalButtons(button)
            })
        })
        // this.ui.handleOutOfModal(this.modal)

        this.items = []
        this.sortedItems = [...this.items]

        // SEARCH BAR
        this.searchBar = new SearchBar(domElements.getInvSearch())
        this.searchBar.element.addEventListener('input', (e) => this.handleSearchInput(e))

        // CATEGORY SORT
        this.categories = domElements.getInvCategories()
        this.categories.forEach(category => {
            category.active = false
            category.addEventListener('click', () => this.categorySort(category))
        })
    }

    handleModalButtons(button) {
        switch (button.id) {
            case 'openInv':
                this.modal.isOpen = true
                this.modal.showModal()
                break
            case 'closeInv':
                this.modal.isOpen = false
                this.modal.close()
                break
        }
    }
}

export default Inventory