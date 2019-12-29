describe('ImageArray', function () {

	beforeEach(module('ImageArray'));

	var imageArray;
	beforeEach(inject(function (_imageArray_) {
		imageArray = new _imageArray_();
	}));

	it('imageArray dependency and methods are not defined', function () {
		expect(imageArray).toBeDefined();
		expect(imageArray.images).toBeDefined();
		expect(imageArray.init).toBeDefined();
		expect(imageArray.reset).toBeDefined();
		expect(imageArray.current).toBeDefined();
		expect(imageArray.prev).toBeDefined();
		expect(imageArray.next).toBeDefined();
		expect(imageArray.hasMultiple).toBeDefined();
		expect(imageArray.pet).toBeDefined();
	});

	it('init, current, hasMultiple, or pet failed', function () {
		// create objects that we can identify later for uniqueness
		var index = 1;
		var pet = {id:index};
		var photo = {id: 1, petid:index};
		imageArray.init(pet, index, photo);
		expect(imageArray.current(index)).toBeDefined();
		expect(imageArray.current(index).petid).toEqual(photo.petid);
		expect(imageArray.current(index).id).toEqual(photo.id);

		photo = {id: 2, petid:index};
		imageArray.init(pet, index, photo);
		expect(imageArray.hasMultiple(index)).toEqual(true);
		imageArray.next(index);
		expect(imageArray.current(index).petid).toEqual(photo.petid);
		expect(imageArray.current(index).id).toEqual(photo.id);

		photo = {id: 3, petid:index};
		imageArray.init(pet, index, photo);
		expect(imageArray.hasMultiple(index)).toEqual(true);
		imageArray.next(index);
		expect(imageArray.current(index).petid).toEqual(photo.petid);
		expect(imageArray.current(index).id).toEqual(photo.id);

		index = 2;
		photo = {id: 4, petid:index};
		imageArray.init(pet, index, photo);
		expect(imageArray.hasMultiple(index)).toEqual(false);
		expect(imageArray.current(index).petid).toEqual(photo.petid);
		expect(imageArray.current(index).id).toEqual(photo.id);

		index = 3;
		photo = {id: 5, petid:index};
		imageArray.init(pet, index, photo);
		expect(imageArray.hasMultiple(index)).toEqual(false);
		expect(imageArray.current(index).petid).toEqual(photo.petid);
		expect(imageArray.current(index).id).toEqual(photo.id);

	});

	it('init, current, hasMultiple, or pet failed', function () {
		var index = 1;
		var pet = {id:index};
		var photo = {id: 1, petid:index};
		imageArray.init(pet, index, photo);
		expect(imageArray.current(index)).toBeDefined();
		expect(imageArray.current(index).petid).toEqual(photo.petid);
		expect(imageArray.current(index).id).toEqual(photo.id);

		photo = {id: 2, petid:index};
		imageArray.init(pet, index, photo);
		expect(imageArray.hasMultiple(index)).toEqual(true);
		imageArray.next(index);
		expect(imageArray.current(index).petid).toEqual(photo.petid);
		expect(imageArray.current(index).id).toEqual(photo.id);

		photo = {id: 3, petid:index};
		imageArray.init(pet, index, photo);
		expect(imageArray.hasMultiple(index)).toEqual(true);
		imageArray.next(index);
		expect(imageArray.current(index).petid).toEqual(photo.petid);
		expect(imageArray.current(index).id).toEqual(photo.id);

		expect(imageArray.current(index).petid).toEqual(1);
		expect(imageArray.current(index).id).toEqual(3);
		imageArray.next(index);
		expect(imageArray.current(index).petid).toEqual(1);
		expect(imageArray.current(index).id).toEqual(1);
		imageArray.next(index);
		expect(imageArray.current(index).petid).toEqual(1);
		expect(imageArray.current(index).id).toEqual(2);
		imageArray.prev(index);
		expect(imageArray.current(index).petid).toEqual(1);
		expect(imageArray.current(index).id).toEqual(1);
		imageArray.prev(index);
		expect(imageArray.current(index).petid).toEqual(1);
		expect(imageArray.current(index).id).toEqual(3);
		imageArray.prev(index);
		expect(imageArray.current(index).petid).toEqual(1);
		expect(imageArray.current(index).id).toEqual(2);

	});

});