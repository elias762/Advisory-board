from PIL import Image, ImageDraw
import math, sys
def bez(p0,p1,p2,p3,n=160):
    pts=[]
    for k in range(n+1):
        t=k/n; u=1-t
        pts.append((u**3*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t**3*p3[0], u**3*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t**3*p3[1]))
    return pts
def wave(fn,W,H,bundles,ss=3,width=1.3):
    img=Image.new('RGBA',(W*ss,H*ss),(0,0,0,0))
    for b in bundles:
        layer=Image.new('RGBA',img.size,(0,0,0,0)); d=ImageDraw.Draw(layer)
        n=b['n']
        for i in range(n):
            t=i/(n-1)
            L=lambda a,c: a+(c-a)*t
            p0=(L(*b['x0'])*W*ss, -2*ss)
            p3=(W*ss+2*ss, L(*b['y3'])*H*ss)
            p1=(L(*b['c1x'])*W*ss, L(*b['c1y'])*H*ss)
            p2=(L(*b['c2x'])*W*ss, L(*b['c2y'])*H*ss)
            col=b['col']; a=int(b['alpha'][0]+(b['alpha'][1]-b['alpha'][0])*math.sin(math.pi*t))
            d.line(bez(p0,p1,p2,p3),fill=col+(a,),width=max(1,int(width*ss)))
        img=Image.alpha_composite(img,layer)
    img=img.resize((W,H),Image.LANCZOS); img.save(fn)
NAVY=(15,19,65); BLUE=(46,111,191); LB=(74,143,219); WHITE=(255,255,255)
# content slides: corner wave, 6.4in x 2.2in
cw=[dict(n=46,x0=(0.08,0.30),y3=(0.30,0.62),c1x=(0.45,0.55),c1y=(0.02,0.30),c2x=(0.70,0.88),c2y=(0.55,0.05),col=NAVY,alpha=(40,120)),
    dict(n=46,x0=(0.40,0.62),y3=(0.70,1.0),c1x=(0.60,0.70),c1y=(0.30,0.02),c2x=(0.80,0.95),c2y=(0.10,0.70),col=BLUE,alpha=(40,140))]
wave('assets/wave_content.png',1920,660,cw)
wave('assets/wave_content_dark.png',1920,660,[dict(b,col=c) for b,c in zip(cw,[WHITE,LB])])
# title/hero: big wave occupying right part 7.5in x 7.5in
tw=[dict(n=60,x0=(0.05,0.35),y3=(0.35,0.75),c1x=(0.30,0.45),c1y=(0.15,0.55),c2x=(0.55,0.85),c2y=(0.85,0.25),col=NAVY,alpha=(30,110)),
    dict(n=60,x0=(0.35,0.60),y3=(0.70,1.02),c1x=(0.50,0.60),c1y=(0.55,0.10),c2x=(0.70,0.95),c2y=(0.20,0.90),col=BLUE,alpha=(30,130))]
wave('assets/wave_title.png',1800,1800,tw)
wave('assets/wave_title_dark.png',1800,1800,[dict(b,col=c) for b,c in zip(tw,[WHITE,LB])])
for f in ['wave_content','wave_title']:
    im=Image.open(f'assets/{f}.png'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); bg.convert('RGB').save(f'prev_{f}.jpg')
    im=Image.open(f'assets/{f}_dark.png'); bg=Image.new('RGBA',im.size,(15,19,65,255)); bg.alpha_composite(im); bg.convert('RGB').save(f'prev_{f}_dark.jpg')
