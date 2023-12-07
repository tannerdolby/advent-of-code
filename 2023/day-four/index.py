input_path = './2023/day-four/input.txt'

def read_input(file_path):
    contents = None

    with open(file_path, 'r', encoding="utf-8") as file:
        contents = file.read()

    return contents

def solve():
    file_contents = read_input(input_path)
    cards = file_contents.split("\n")
    total_points = 0

    for card in cards:
        split = card.split("|")
        split[0] = split[0].split(":")[1]
        winning_numbers = list(filter(None, split[0].strip().split(" ")))
        numbers_to_check = list(filter(None, split[1].strip().split(" ")))
        points = 0

        for num in numbers_to_check:
            if num in winning_numbers:
                points += 1

        if (points > 0):
            total_points += pow(2, points-1)
    
    return total_points

ans = solve()
print("Part 1:", ans)

def solve_two():
    file_contents = read_input(input_path)
    cards = file_contents.split("\n")
    card_map = {}
    freq = {}
    card_idx = 1

    for card in cards:
        split = card.split("|")
        split[0] = split[0].split(":")[1]
        winning_numbers = list(filter(None, split[0].strip().split(" ")))
        numbers_to_check = list(filter(None, split[1].strip().split(" ")))
        points = 0

        for num in numbers_to_check:
            if num in winning_numbers:
                points += 1

        if (card_idx not in card_map):
            card_map[card_idx] = 0

            if (card_idx not in freq):
                freq[card_idx] = 0

            freq[card_idx] += 1

        if (points > 0):
            card_map[card_idx] = points

        card_idx += 1

    for j in range(1, len(cards)+1):
        matches = card_map[j]
        factor = freq[j]

        while factor > 0:
            for k in range(j+1, j+matches+1):
                if k not in freq:
                    freq[k] = 0
                freq[k] += 1

            factor -= 1

    return sum(freq.values())

ans_two = solve_two()
print("Part 2:", ans_two)
