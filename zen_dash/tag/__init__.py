from typing import List, Union
from uuid import uuid4

class TAG:
    def __init__(self, tag:str, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        self.id = id
        self.style = style
        self.tag = tag
        self.childern = childern
        self.other_attributes = other_attributes

    @property
    def get_id(self):
        if self.id is None:
            return ''        
        else:
            return f"id='{self.id}'"

    def compile(self):
       
        if not self.style:
            self.style = ""
        elif isinstance(self.style, str):
            pass
        elif isinstance(self.style, dict):
            temp = ''
            for key, value in self.style.items():
                t = f'{key}:{value};'
                temp = temp + ' ' + t
            self.style = temp
        else:
            raise Exception('style is not right')
        if not self.childern:
            raise Exception('Data is not provided')
        
        others  = ''
        for key, value in self.other_attributes.items():
            others += f' {key}="{value}"'
        if isinstance(self.childern, str):
            return f'<{self.tag} {self.get_id} style="{self.style}" {others} >{self.childern}</{self.tag}>'
        if isinstance(self.childern, TAG):
           
            return f'<{self.tag} {self.get_id} style="{self.style}" {others} >{self.childern.compile()}</{self.tag}>'
        elif isinstance(self.childern, list):
            d = [ ]
            for dd in self.childern:
                if isinstance(dd, str):
                    d.append(dd)
                elif isinstance(dd, TAG):
                    d.append(dd.compile())
                else:
                    raise Exception('data need to be str or TAG type')
            d = ' '.join(d)
            t = ''
            for key, value in self.other_attributes.items():
                t += f' {key}="{value}"'
            return f'<{self.tag} {self.get_id} style="{self.style}" {others}>{d}</{self.tag}>'
        else:
            raise Exception('data need to be str or TAG type')

class A(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('a', childern=childern, id=id, style=style, other_attributes=other_attributes )

class SPAN(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('span', childern=childern, id=id, style=style, other_attributes=other_attributes )

class H1(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('h1', childern=childern, id=id, style=style, other_attributes=other_attributes )

class H2(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('h2', childern=childern, id=id, style=style, other_attributes=other_attributes )

class H3(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('h3', childern=childern, id=id, style=style, other_attributes=other_attributes )

class H4(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('h4', childern=childern, id=id, style=style, other_attributes=other_attributes )

class H5(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('h5', childern=childern, id=id, style=style, other_attributes=other_attributes )

class H6(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('h6', childern=childern, id=id, style=style, other_attributes=other_attributes )

class DIV(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('div', childern=childern, id=id, style=style, other_attributes=other_attributes )

class TITLE(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('title', childern=childern, id=id, style=style, other_attributes=other_attributes )

class P(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('p', childern=childern, id=id, style=style, other_attributes=other_attributes )

class B(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('b', childern=childern, id=id, style=style, other_attributes=other_attributes )

class I(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('i', childern=childern, id=id, style=style, other_attributes=other_attributes )

class U(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('u', childern=childern, id=id, style=style, other_attributes=other_attributes )

class CENTER(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('center', childern=childern, id=id, style=style, other_attributes=other_attributes )

class EM(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('em', childern=childern, id=id, style=style, other_attributes=other_attributes )

class SUP(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('sup', childern=childern, id=id, style=style, other_attributes=other_attributes )

class SUB(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('sub', childern=childern, id=id, style=style, other_attributes=other_attributes )

class OL(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('ol', childern=childern, id=id, style=style, other_attributes=other_attributes )

class LI(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('li', childern=childern, id=id, style=style, other_attributes=other_attributes )

class UL(TAG):
    def __init__(self, childern: List[any], id:str=None, style:Union[dict, str]='', other_attributes:dict= {}):
        super().__init__('ul', childern=childern, id=id, style=style, other_attributes=other_attributes )
