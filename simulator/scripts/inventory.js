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
                this.modal.showModal()
                break
            case 'closeInv':
                this.modal.close()
                break
        }
    }

    placeItem(item) {
        for(let i = 0; i < this.items.length; i++) {
            let delCount = 0
            if(delCount == 1) {
                return
            }
            if(item == this.items[i]) {
                this.items.splice(i, 1)
                delCount++
            }
        }
    }

    deleteItem(selectedItem) {
        if(this.items.length == 0) {
            return
        }

        let itemRemoved = false

        // remove selected item from the inventory
        this.items = this.items.filter(item => {
            if(!itemRemoved && item === selectedItem){
                itemRemoved = true // remove this item
                return false
            }
            return true 
        })

        itemRemoved = false // reset flag

        // remove selected item from search result
        this.searchResults = this.searchResults.filter(item => {
            if(!itemRemoved && item === selectedItem) {
                itemRemoved = true
                return false
            }
            return true
        })
    }
}

export default Inventory