class SearchBar {
    constructor(element) {
         this.element = element
    }

    kmpSearch(string, pattern) {
        const strLen = string.length
        const ptrnLen = pattern.length 
        const results = []

        // create the LPS array from the pattern
        let lps = [0]
        let prevLPS = 0

        for (let i = 1; i < ptrnLen; i++) {
            if (pattern[i] === pattern[prevLPS]) {
                lps[i] = prevLPS + 1
                prevLPS++
            } else if (prevLPS !== 0){
                prevLPS = lps[prevLPS - 1]
                i--
            } else {
                lps[i] = 0
            }             
        }

        // perform the search
        let i = 0 // for string
        let j = 0 // for pattern
        
        while (i < strLen) {
            if (string[i] === pattern[j]) {
                i++
                j++
            } else {
                if (j == 0) {
                    i++
                } else {
                    j = lps[j - 1]
                }
            }
            
            if (j === ptrnLen && j !== 0){
                results.push(string)
            }

        }
        return results
    }
}

export default SearchBar