import re

input_path = './2023/day-two/input.txt'

def read_input(file_path):
    contents = None

    with open(file_path, 'r', encoding="utf-8") as file:
        contents = file.read()

    return contents

def solve():
    games = read_input(input_path)
    id_sum = 0
    id_regex = re.compile(r"Game \d+")
    regex = re.compile(r"\d+ \w+")

    for game in games.split("\n"):
        good_game = True
        game_id = id_regex.search(game).group().split(" ")[1]
        sets = game.split(";")
        
        for cube_set in sets:
            cs = regex.findall(cube_set)
            freq = {
                "red": 0,
                "green": 0,
                "blue": 0
            }

            for item in cs:
                amount, color = item.split(" ")
                freq[color] = int(amount)
                
                if (freq["red"] > 12 or freq["green"] > 13 or freq["blue"] > 14):
                    good_game = False

        if good_game:
            id_sum += int(game_id)

    return id_sum

ans = solve()
print("Part 1:", ans)

def solve_two():
    games = read_input(input_path)
    power_sum = 0
    id_regex = re.compile(r"Game \d+")
    regex = re.compile(r"\d+ \w+")

    for game in games.split("\n"):
        power = 1
        game_id = id_regex.search(game).group().split(" ")[1]
        sets = game.split(";")
        max_values = [0, 0, 0]
        
        for cube_set in sets:
            cs = regex.findall(cube_set)
            freq = {
                "red": 0,
                "green": 0,
                "blue": 0
            }

            for item in cs:
                amount, color = item.split(" ")
                freq[color] = int(amount)
                max_values[0] = max(max_values[0], freq["red"])
                max_values[1] = max(max_values[1], freq["green"])
                max_values[2] = max(max_values[2], freq["blue"])

        for value in max_values:
            power *= value

        power_sum += power

    return power_sum

ans_two = solve_two()
print("Part 2:", ans_two)