import os

PRODUCTS_PATH = 'content/products'

def get_products_filename():
    res = []
    for file_path in os.listdir(PRODUCTS_PATH):
        if os.path.isfile(os.path.join(PRODUCTS_PATH, file_path)):
            # add filename to list
            res.append( os.path.join(PRODUCTS_PATH, file_path) )
    return res

def get_file_info(filepath, lines):
    header_begin = False
    header_end   = False
    retorno = {'filepath': filepath}
    content = ''
    for line in lines:
        if line.startswith('---'):
            if not header_begin:
                header_begin = True
                continue
            else:
                header_end = True
                continue
        if not header_end:
            tokens = line.split(':')
            retorno[cleanup_chars(tokens[0])] = cleanup_chars(' '.join( tokens[1:len(tokens)] ))
        else:
            content += line
    retorno['conteudo'] = content
    return retorno

def cleanup_chars(param):
    param = param.strip()
    param = param.replace('"', '')
    return param

if __name__ == '__main__':
    files = get_products_filename()
    for filepath in files:
        print(filepath)
        file = open(filepath, "r")
        file_content = file.readlines()
        meta = get_file_info(filepath, file_content)
        print(meta)