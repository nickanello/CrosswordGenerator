from words import*

words.sort(reverse=True, key=len)

with open("words2.py", "w") as words2:
        words2.write("words = [")
        for key in words:
            words2.write('\'' + key + '\',\n')
        words2.write(']')