input_file_path = "./2023/day-one/input.txt"

def read_input(file_path):
    contents = None

    with open(file_path, 'r', encoding="utf-8") as file:
        contents = file.read()

    return contents

# find first leftmost and rightmost 1-9 digits
def find_first_digits(calibrations):
    total_sum = 0

    for calibration in calibrations.split():
        n = len(calibration)
        left = 0
        right = n - 1
        num = ""

        # find first left and right digit
        while (left < n and not calibration[left].isnumeric()):
            left += 1
        while (right >= 0 and not calibration[right].isnumeric()):
            right -= 1

        if (left < n):
            num += calibration[left]
        if (right >= 0):
            num += calibration[right]

        if num != "":
            total_sum += int(num)

    return total_sum

# Part 1
def solve():
    calibrations = read_input(input_file_path)
    total_sum = 0

    return find_first_digits(calibrations)

ans = solve()
print("Part 1:", ans, "\nExpected: Your puzzle answer was 55538.")

# Part 2

# whats a digit?
# digits 1-9
# words: one, two, three ... nine
valid_digits = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}

def find_first(leftmost_word, rightmost_word, leftmost_digit, rightmost_digit):
    noWordsFound = leftmost_word['val'] == None and rightmost_word['val'] == None
    hasTwoWords = leftmost_word['val'] != None and rightmost_word['val'] != None
    hasTwoDigits = leftmost_digit['val'] != None and rightmost_digit['val'] != None
    hasLeft = leftmost_word['val'] != None and leftmost_digit['val'] != None
    hasRight = rightmost_word['val'] != None and rightmost_digit['val'] != None
    num = ""
    left_val = None
    right_val = None

    if (hasTwoWords and hasTwoDigits):
        if leftmost_word['i'] < leftmost_digit['i']:
            left_val = leftmost_word['val']
        else:
            left_val = leftmost_digit['val']
        
        if rightmost_word['i'] < rightmost_digit['i']:
            right_val = rightmost_word['val']
        else:
            right_val = rightmost_digit['val']

    if (hasLeft):
        if leftmost_word['i'] < leftmost_digit['i']:
            left_val = leftmost_word['val']
        else:
            left_val = leftmost_digit['val']
    
    if (hasRight):
        if rightmost_word['i'] > rightmost_digit['i']:
            right_val = rightmost_word['val']
        else:
            right_val = rightmost_digit['val']
    
    if (leftmost_word['val'] is None):
        left_val = leftmost_digit['val']

    if (rightmost_word['val'] is None):
        right_val = rightmost_digit['val']

    if (leftmost_digit['val'] is None):
        left_val = leftmost_word['val']

    if (rightmost_digit['val'] is None):
        right_val = rightmost_word['val']

    return int(str(left_val + right_val))

def solve_two():
    calibrations = read_input(input_file_path)
    total_sum = 0

    for calibration in calibrations.split():
        leftmost_digit = {"val": None, "i": float('inf')}
        rightmost_digit = {"val": None, "i": float('-inf')}
        left_val = {"val": None, "i": float('inf')}
        right_val = {"val": None, "i": float('-inf')}
        n = len(calibration)
        left = 0
        right = 0
        s = ""

        while (right <= n):
            if (right == n):
                left += 1
                right = left
                s = ""
            if (s in valid_digits):
                left_val = {"val": valid_digits[s], "i": left}
                break
            if (right < n and calibration[right].isnumeric() and right < leftmost_digit['i']):
                leftmost_digit = {"val": str(calibration[right]), "i": right}
            
            if (right < n):
                s += calibration[right]
            right += 1

        left = n-1
        right = n-1
        s = ""

        while (right >= 0):
            rev = s[::-1]
    
            if (s[::-1] in valid_digits):
                right_val = {"val": valid_digits[rev], "i": right+1}
                break

            if (calibration[right].isnumeric() and right > rightmost_digit['i']):
                rightmost_digit = {"val": str(calibration[right]), "i": right}

            if (right == 0):
                left -= 1
                right = left
                s = ""

            s += calibration[right]
            right -= 1

        num = find_first(left_val, right_val, leftmost_digit, rightmost_digit)
       
        total_sum += num

    return total_sum

ans_two = solve_two()
print("Part 2:", ans_two, "\nExpected: Your puzzle answer was 54875.")
